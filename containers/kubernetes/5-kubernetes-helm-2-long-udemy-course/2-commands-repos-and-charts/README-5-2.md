# 🎯 Helm Information Commands

## 📦 Release Information
The `helm get` command allows you to retrieve information about a deployed release.

### Basic Syntax
```sh
helm get [command] <release_name>
```

### Available Commands
| Command | Description | Example |
|---------|-------------|---------|
| `all` | Download all information | `helm get all redis1` |
| `hooks` | Show hook information | `helm get hooks apache1` |
| `manifest` | Show the K8s manifest | `helm get manifest apache1` |
| `metadata` | Show release metadata | `helm get metadata redis1` |
| `notes` | Show release notes | `helm get notes apache1` |
| `values` | Show release values | `helm get values redis1` |

### 🔍 Example Output
When you run `helm get manifest apache1`, you'll see the complete Kubernetes manifests for your release, including:
- NetworkPolicies
- PodDisruptionBudgets
- ServiceAccounts
- Services
- Deployments

## 📋 Chart Information
The `helm show` command helps you examine a chart before installation.

### Basic Syntax
```sh
helm show [command] <chart_name>
```

### Available Commands
| Command | Description | Example Use Case |
|---------|-------------|------------------|
| `all` | Display all chart information | When you need complete documentation |
| `chart` | Show chart definition | To verify chart metadata and dependencies |
| `crds` | List Custom Resource Definitions | When working with operators or custom resources |
| `readme` | View chart documentation | To understand installation and configuration |
| `values` | Display configurable values | To see what can be customized |

### 💡 Pro Tips
1. Save outputs to files for reference:
```sh
helm show readme bitnami/apache > apache_readme.md
helm show values bitnami/apache > my_values.yaml
```

2. Use these commands before installation to:
   - Review configuration options
   - Understand chart requirements
   - Plan your customizations
   - Document your deployment

3. Combine with `grep` for specific information:
```sh
helm show values bitnami/apache | grep 'password'
```