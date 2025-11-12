<!-- https://www.youtube.com/watch?v=7UIWPIWrkpY -->
# 🌊🔍 SonarQube

🌊🔍 SonarQube is a code quality and security analysis platform that identifies bugs, vulnerabilities, code smells, and tracks test coverage across 15+ languages.

## 🚀 QuickStart
Let's launch it with Docker.
```sh
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
```
Access at [localhost:9000](http://localhost:9000/) with credentials:
- **User**: `admin`
- **Password**: `admin`

> You'll be prompted to change the password on first login. Use these new credentials:
> - **User**: `admin`
> - **Password**: `$Admin1$Admin1`
> 
> Fill the *Update password* page manually, or automate it with:
> ```sh
> curl -u admin:admin -X POST \
>   'http://localhost:9000/api/users/change_password?login=admin&previousPassword=admin&password=$Admin1$Admin1'
>   ```

## 🔍 What It Analyzes

- **Bugs**: Code errors that could cause runtime issues
- **Vulnerabilities**: Confirmed security flaws (SQL injection, XSS, etc.)
- **Security Hotspots**: Security-sensitive code needing review (HTTP, cookies, etc.)
- **Code Smells**: Maintainability issues (duplicated code, complexity)
- **Coverage**: Test coverage metrics

## 😊 Example with The Calculator project
The Calculator project is a simple JS project using Node + Vitest, to practice testing and SonarQube.

### Test coverage: Run
To see the **test coverage** execute:
```sh
npm run test -- --coverage
```

```sh
Output:

 % Coverage report from v8
---------------|---------|----------|---------|---------|
File           | % Stmts | % Branch | % Funcs | % Lines |
---------------|---------|----------|---------|---------|
All files      |     100 |      100 |     100 |     100 |                   
 calculator.js |     100 |      100 |     100 |     100 |                  
---------------|---------|----------|---------|---------|
```

### Understanding Test Coverage Metrics

The coverage report shows four metrics that measure how thoroughly your tests examine your code:

- **% Statements**: Percentage of executable statements that were run during tests. A statement is any single instruction in your code (variable assignments, function calls, return statements, etc.).

- **% Branches**: Percentage of decision paths tested in conditional statements. For example, in `if (x > 5)`, there are two branches: one when the condition is true and one when false. 100% branch coverage means both paths were tested.

- **% Functions**: Percentage of defined functions that were called at least once during tests. If you have 10 functions and tests call 8 of them, you have 80% function coverage.

- **% Lines**: Percentage of code lines that were executed during tests. Similar to statement coverage but counts physical lines rather than individual statements.

**Example**: If a function has an `if/else` statement but your tests only check the `if` path, you might have 100% function coverage (the function was called) but only 50% branch coverage (only one of two branches tested).

**Example 2**: The difference between statements and lines is subtle, for example a line can have several statements, like: `const x = 5; const y = 10; const z = x + y;` , this is 1 line but 3 statements. In practice, most developers pay more attention to the **statement coverage**.

### Test Coverage: Launch HTML
A `coverage` folder must have been created in your project. 

To see the HTML execute:
```sh
start coverage/index.html
```

> Or if you have a reporter in your `vitest.config.js`, the HTML will be nested in the reporter name, e.g: if reporter = 'lcov': 
> ```sh
> start coverage/lcov-report/index.html
> ```

### SonarQube
**SonarQube steps:**
- Go to SonarQube: http://localhost:9000/
- Click "**Create a local project**"
- Enter:
  - **Display name**: My Node Project
  - **Project key**: my-node-project
  - **Branch**: master
- Click "**Set Up**"
- Choose "**Locally**"
- **Generate a token** (give it a name like "local-token")
- **Copy the token** - you'll need it!
- Select "**JS/TS & Web**" for your build tool

**Project steps:**
- Install sonar in npm:
  - `npm install -g @sonar/scan`
- Execute the sonar analysis with the token:
  - `sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_e861f193e51fe3ae0a225217f5a164ba6175e4f2 -Dsonar.projectKey=my-node-project`

A `.scannerwork` folder must have been created in your project. And in your terminal it will tell you something like this:
```
[INFO]  ScannerEngine: ANALYSIS SUCCESSFUL, you can find the results at: http://localhost:9000/dashboard?id=my-node-project
[INFO]  ScannerEngine: Analysis total time: 1:03.925 s
[INFO]  ScannerEngine: SonarScanner Engine completed successfully
```

You can see the different metrics and analysis of your code security in Sonar.

🥳 Happy securing! 