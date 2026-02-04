# Test Doubles: The Complete Guide

## Understanding Test Doubles Hierarchy

Test doubles exist on a **spectrum of implementation complexity**:
```
FAKE ────────> STUB ────────> DUMMY
(Full logic)   (Returns data)  (Just exists)

        MOCK ───┐
                ├──> Special: Add verification
        SPY ────┘
```

---

## Why Vitest Only Has `vi.mock()` and `vi.spyOn()`

**Because JavaScript makes the other 3 trivial to implement yourself!**

- **FAKE, STUB, DUMMY**: Just plain objects/classes
- **MOCK, SPY**: Need special tracking → Vitest provides these

---

## 1. FAKE (Most Implementation)

**Definition**: A simplified working implementation, unsuitable for production.

**When to use**: Replace infrastructure (databases, file systems, external APIs).

### Example: In-Memory Database
```typescript
// Real Repository Interface
interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}

// FAKE - In-memory implementation
class FakeUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}

// TEST
describe('UserService with Fake', () => {
  test('should save and retrieve user', async () => {
    const fakeRepo = new FakeUserRepository();
    const service = new UserService(fakeRepo);

    await service.createUser({ id: '1', name: 'Alice' });
    const user = await service.getUser('1');

    expect(user?.name).toBe('Alice');
  });
});
```

---

## 2. STUB (Returns Hardcoded Data)

**Definition**: Returns predefined responses, no real logic.

**When to use**: Provide fake data to test behavior without side effects.

### Using `satisfies` (Type-Safe Stub)
```typescript
class UserService {
  constructor(private repo: UserRepository) {}
  
  async getUser(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }
}

// STUB - Type-safe with satisfies
const userRepositoryStub = {
  save: async (_user: User): Promise<void> => {},
  findById: async (_id: string): Promise<User | null> => ({ 
    id: '1', 
    name: 'Stub User' 
  }),
  delete: async (_id: string): Promise<void> => {},
} satisfies UserRepository;

// TEST
test('getUser returns stub data', async () => {
  const service = new UserService(userRepositoryStub);
  
  const user = await service.getUser('any-id');
  
  expect(user?.name).toBe('Stub User');
  // NO verification - we don't care if findById was called
});
```

### Using `as unknown as` (Partial Stub)
```typescript
// STUB - Only implement what you need
const partialStub = {
  findById: async (_id: string): Promise<User | null> => ({ 
    id: '1', 
    name: 'Partial Stub' 
  }),
} as unknown as UserRepository;

test('works with partial stub', async () => {
  const service = new UserService(partialStub);
  const user = await service.getUser('123');
  
  expect(user?.name).toBe('Partial Stub');
});
```

### Different Return Values Per Call
```typescript
let callCount = 0;
const dynamicStub = {
  findById: async (_id: string): Promise<User | null> => {
    callCount++;
    return callCount === 1 
      ? { id: '1', name: 'First Call' }
      : { id: '2', name: 'Second Call' };
  },
} as unknown as UserRepository;

test('stub returns different values', async () => {
  const service = new UserService(dynamicStub);
  
  const user1 = await service.getUser('1');
  const user2 = await service.getUser('2');
  
  expect(user1?.name).toBe('First Call');
  expect(user2?.name).toBe('Second Call');
});
```

---

## 3. DUMMY (Just a Placeholder)

**Definition**: Passed around but never used. Exists only to fill parameters.

**When to use**: Required parameter that's irrelevant to the test.

### Example: Null/Undefined Dummy
```typescript
class ReportService {
  generateReport(data: string, logger?: Logger): string {
    // logger is optional and not used in this path
    return `Report: ${data}`;
  }
}

// TEST
test('generates report without logger', () => {
  const service = new ReportService();
  
  // DUMMY - logger is undefined (not used)
  const report = service.generateReport('Sales Data', undefined);
  
  expect(report).toBe('Report: Sales Data');
});
```

### Example: Empty Object Dummy
```typescript
class EmailService {
  constructor(
    private sender: EmailSender,
    private analytics: Analytics  // Not used in some tests
  ) {}

  sendEmail(to: string, message: string): void {
    this.sender.send(to, message);
    // analytics only used in production, not in this test
  }
}

// DUMMY - Empty object cast as Analytics
const analyticsDummy = {} as unknown as Analytics;

test('sends email without analytics', () => {
  const senderStub = {
    send: vi.fn(),
  } as unknown as EmailSender;
  
  const service = new EmailService(senderStub, analyticsDummy);
  
  service.sendEmail('user@example.com', 'Hello');
  
  expect(senderStub.send).toHaveBeenCalled();
  // analyticsDummy is never touched
});
```

### Example: Dummy for Constructor
```typescript
class PaymentProcessor {
  constructor(
    private gateway: PaymentGateway,
    private notifier: Notifier,
    private auditor: Auditor  // Only needed for audit logs
  ) {}

  calculateFee(amount: number): number {
    // Simple calculation, no dependencies used
    return amount * 0.03;
  }
}

// TEST
test('calculates fee without dependencies', () => {
  const dummyGateway = {} as unknown as PaymentGateway;
  const dummyNotifier = {} as unknown as Notifier;
  const dummyAuditor = {} as unknown as Auditor;
  
  const processor = new PaymentProcessor(
    dummyGateway,
    dummyNotifier,
    dummyAuditor
  );
  
  const fee = processor.calculateFee(100);
  
  expect(fee).toBe(3);
});
```

---

## 4. SPY (Records Interactions)

**Definition**: Watches and records how code is used, optionally with real/fake implementation.

**When to use**: Verify interactions while keeping some real behavior.

### Spy with Real Implementation
```typescript
class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`); // This prints to terminal when tests run every time logger.log() is used
  }
}

class UserService {
  constructor(private logger: Logger) {}
  
  createUser(user: { id: string; name: string }): void {
    // This calls logger.log with the message
    this.logger.log(`User created: ${user.name}`);
  }
}

// SPY - Watch real Logger
test('logs user creation', () => {
  const logger = new Logger();
  const logSpy = vi.spyOn(logger, 'log');
  
  const service = new UserService(logger);
  service.createUser({ id: '1', name: 'Alice' });
  
  // Verify logger.log was called with this message
  expect(logSpy).toHaveBeenCalledWith('User created: Alice');
  
  logSpy.mockRestore();
});
```

### Spy with Custom Implementation
```typescript
// SPY - Custom logger that records messages
class LoggerSpy {
  public messages: string[] = [];
  
  log(message: string): void {
    this.messages.push(message);
    // Optionally still do real logging:
    // console.log(message);
  }
}

class UserService {
  constructor(private logger: Logger) {}
  
  createUser(user: { id: string; name: string }): void {
    // This calls logger.log with the message
    this.logger.log(`User created: ${user.name}`);
  }
}

test('records all log messages', () => {
  const loggerSpy = new LoggerSpy();
  const service = new UserService(loggerSpy);
  
  service.createUser({ id: '1', name: 'Alice' });
  service.createUser({ id: '2', name: 'Bob' });
  
  expect(loggerSpy.messages).toHaveLength(2);
  expect(loggerSpy.messages[0]).toContain('Alice');
  expect(loggerSpy.messages[1]).toContain('Bob');
});
```

### Spy on process.exit
```typescript
// SPY - Prevent process.exit from actually exiting
const exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`process.exit(${code}) called`);
});

test('calls process.exit on error', () => {
  expect(() => {
    dangerousFunction();
  }).toThrow('process.exit(1) called');
  
  expect(exitSpy).toHaveBeenCalledWith(1);
  
  exitSpy.mockRestore();
});
```

### Manual Spy with vi.fn()
```typescript
const processSpy = {
  exit: vi.fn(),
  otherMethod: vi.fn(),
} as unknown as typeof process;

test('manually spy on process', () => {
  const checker = new EnvChecker(processSpy);
  checker.validate();
  
  expect(processSpy.exit).toHaveBeenCalledWith(1);
});
```

---

## 5. MOCK (Verify Behavior)

**Definition**: Verifies expectations - fails if not called correctly.

**When to use**: Test interactions between objects, ensure methods are called.

### Basic Mock with vi.mock()
```typescript
// Mock the entire module
vi.mock('../emailSender', () => ({
  EmailSender: vi.fn().mockImplementation(() => ({
    send: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
  }))
}));

import { EmailSender } from '../emailSender';

test('sends email and disconnects', async () => {
  const emailSenderMock = new EmailSender();
  const service = new EmailService(emailSenderMock);
  
  await service.sendWelcomeEmail('user@example.com');
  
  // VERIFY - This is what makes it a MOCK
  expect(emailSenderMock.send).toHaveBeenCalledWith(
    'user@example.com',
    'Welcome!'
  );
  expect(emailSenderMock.disconnect).toHaveBeenCalled();
});
```

### Mock with Return Values
```typescript
const userRepoMock = {
  findById: vi.fn().mockResolvedValue({ id: '1', name: 'Mock User' }),
  save: vi.fn().mockResolvedValue(undefined),
} as unknown as UserRepository;

test('updates user name', async () => {
  const service = new UserService(userRepoMock);
  
  await service.updateUserName('1', 'New Name');
  
  // Verify it fetched the user
  expect(userRepoMock.findById).toHaveBeenCalledWith('1');
  
  // Verify it saved with updated name
  expect(userRepoMock.save).toHaveBeenCalledWith({
    id: '1',
    name: 'New Name'
  });
  
  // Verify order
  expect(userRepoMock.findById).toHaveBeenCalledBefore(userRepoMock.save);
});
```

### Mock with Different Return Values Per Call
```typescript
const apiMock = {
  fetchData: vi.fn()
    .mockResolvedValueOnce({ status: 'loading' })
    .mockResolvedValueOnce({ status: 'success', data: [1, 2, 3] }),
} as unknown as API;

test('retries until success', async () => {
  const service = new DataService(apiMock);
  
  const result = await service.fetchWithRetry();
  
  expect(result.data).toEqual([1, 2, 3]);
  expect(apiMock.fetchData).toHaveBeenCalledTimes(2);
});
```

### Complex Mock Scenario
```typescript
const paymentGatewayMock = {
  authorize: vi.fn().mockResolvedValue({ authCode: 'AUTH123' }),
  capture: vi.fn().mockResolvedValue({ transactionId: 'TXN456' }),
  refund: vi.fn(),
} as unknown as PaymentGateway;

const notifierMock = {
  sendEmail: vi.fn(),
  sendSMS: vi.fn(),
} as unknown as Notifier;

test('processes payment and notifies user', async () => {
  const service = new PaymentService(paymentGatewayMock, notifierMock);
  
  await service.processPayment({
    amount: 100,
    email: 'user@example.com',
    phone: '+1234567890'
  });
  
  // Verify payment flow
  expect(paymentGatewayMock.authorize).toHaveBeenCalledWith({ amount: 100 });
  expect(paymentGatewayMock.capture).toHaveBeenCalledWith('AUTH123');
  
  // Verify notifications
  expect(notifierMock.sendEmail).toHaveBeenCalledWith(
    'user@example.com',
    expect.stringContaining('TXN456')
  );
  expect(notifierMock.sendSMS).toHaveBeenCalledWith(
    '+1234567890',
    expect.stringContaining('100')
  );
  
  // Verify order
  expect(paymentGatewayMock.authorize).toHaveBeenCalledBefore(
    paymentGatewayMock.capture
  );
  expect(paymentGatewayMock.capture).toHaveBeenCalledBefore(
    notifierMock.sendEmail
  );
});
```

---

## Summary Cheat Sheet

| Test Double | Implementation | Verification | Use Case |
|-------------|----------------|--------------|----------|
| **FAKE** | Full working logic | ❌ No | Replace infrastructure (DB, FS, API) |
| **STUB** | Returns hardcoded data | ❌ No | Provide test data |
| **DUMMY** | Empty/null/undefined | ❌ No | Fill required parameters |
| **SPY** | Records calls (+ optional logic) | ✅ Yes | Track interactions |
| **MOCK** | Returns data + expectations | ✅ Yes | Verify behavior |

---

## The Real Difference: Stub vs Mock

**STUB**:
```typescript
const stub = { getData: () => 'fake data' };
const result = service.process(stub);
expect(result).toBe('processed fake data');
// ❌ No verification of stub
```

**MOCK**:
```typescript
const mock = { getData: vi.fn(() => 'fake data') };
const result = service.process(mock);
expect(result).toBe('processed fake data');
expect(mock.getData).toHaveBeenCalled(); // ✅ Verification!
```

---

## When to Use Each

1. **FAKE**: Integration tests with in-memory implementations
2. **STUB**: Unit tests needing simple return values
3. **DUMMY**: Parameters that aren't used in the test path
4. **SPY**: Verify interactions while keeping some real behavior
5. **MOCK**: Verify complex interactions and call order

---

## Why Vitest Only Has Mock & Spy

**FAKE, STUB, DUMMY** are just plain JavaScript:
- Objects with methods
- Functions that return values
- `null`/`undefined`

**MOCK, SPY** need special capabilities:
- Track call count
- Record arguments
- Verify call order
- Provide matchers like `toHaveBeenCalledWith()`

→ This is why Vitest only provides `vi.mock()` and `vi.spyOn()` 🎯