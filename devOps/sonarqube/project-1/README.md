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

You'll be prompted to change the password on first login. To automate this:
```sh
curl -u admin:admin -X POST \
  'http://localhost:9000/api/users/change_password?login=admin&previousPassword=admin&password=$Admin1$Admin1'
  ```

## What It Analyzes

- **Bugs**: Code errors that could cause runtime issues
- **Vulnerabilities**: Confirmed security flaws (SQL injection, XSS, etc.)
- **Security Hotspots**: Security-sensitive code needing review (HTTP, cookies, etc.)
- **Code Smells**: Maintainability issues (duplicated code, complexity)
- **Coverage**: Test coverage metrics