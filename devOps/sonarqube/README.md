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
The Calculator project is a simple JS project using Node + Vite, to practice testing and SonarQube.

### Test coverage: Run
To see the **test coverage** execute:
```sh
npm run test -- --coverage
```

```sh
Output:

 % Coverage report from v8
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------|---------|----------|---------|---------|-------------------
All files      |     100 |      100 |     100 |     100 |                   
 calculator.js |     100 |      100 |     100 |     100 |                  
---------------|---------|----------|---------|---------|-------------------
```

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