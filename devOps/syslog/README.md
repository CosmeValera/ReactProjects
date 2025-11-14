# Syslog & Winston

## What is Syslog?

Syslog is a standard protocol for message logging. It defines a structured format for log messages that looks like this:

```m
2024-10-08 12:00:00 [INFO]: Handling root route
```

```m
2024-10-08 12:01:00 [ERROR]: An error occurred while connecting to the database
```

> Click here to see one simple [Logger](./winston-example/logger.js) implementation

### Syslog Severity Levels

Syslog defines **8 priority levels** (from highest to lowest):

| Level | Name | Description |
|-------|------|-------------|
| 0 | **Emergency** | System unusable |
| 1 | **Alert** | Action must be taken immediately |
| 2 | **Critical** | Critical conditions |
| 3 | **Error** | Error conditions |
| 4 | **Warning** | Warning conditions |
| 5 | **Notice** | Normal but significant |
| 6 | **Info** | Informational messages |
| 7 | **Debug** | Debug-level messages |

## What is Winston?

Winston is a **JavaScript logging library** that implements the syslog logging pattern for Node.js applications.

### Key Features:
- Implements syslog-style severity levels
- Supports multiple transports (console, files, remote servers)
- Customizable log formats with timestamps
- Async logging to prevent blocking code
- Production-ready error handling

Winston brings the proven syslog standard to the JavaScript ecosystem, making it easy to implement structured, standardized logging in Node.js applications.