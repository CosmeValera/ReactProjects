# 🎯 Update Release

## 📝 Basic Helm Upgrade Commands

The `helm upgrade` command is used to modify or upgrade a release. Here are the essential commands:

```bash
# Basic upgrade syntax
helm upgrade RELEASE_NAME CHART_NAME

# Example: Update apache1 release using the bitnami/apache chart
helm upgrade apache1 bitnami/apache

# Upgrade to a specific version
helm upgrade apache1 bitnami/apache --version 9.2.0

# Preview changes with dry-run
helm upgrade apache1 bitnami/apache --dry-run
```

## 🔍 Checking Release Status

```bash
# List all releases
helm ls

# Get current values for a release
helm get values apache1

# Get the full manifest
helm get manifest apache1

# Check release status
helm status apache1

# View release history
helm history apache1
```

## 📝 Update Release with Values

### 1. Using --set flag
```bash
# Update a single value
helm upgrade apache1 bitnami/apache --set replicaCount=3

# Update service port
helm upgrade apache1 bitnami/apache --set service.port=8080

# Update multiple values
helm upgrade apache1 bitnami/apache --set replicaCount=3,service.type=LoadBalancer
```

### 2. Using Values File
```bash
# Create a values.yaml file with your custom values
# Then use it in the upgrade command
helm upgrade apache1 bitnami/apache -f values.yaml
```

### 3. Combining Both Approaches
```bash
# Use both values file and --set flag
helm upgrade apache1 bitnami/apache -f values.yaml --set replicaCount=3
```

## 🛠️ Useful Upgrade Flags

Common flags to use with `helm upgrade`:
- `--install`: If release doesn't exist, install it
- `--atomic`: Roll back changes if upgrade fails
- `--wait`: Wait for pods to be ready before marking upgrade as complete
- `--timeout`: Set timeout for upgrade (default: 5m0s)

Example with multiple flags:
```bash
helm upgrade apache1 bitnami/apache \
  --set replicaCount=3 \
  --install \
  --atomic \
  --wait \
  --timeout 10m
```
To verify the upgrade:
```bash
# Check release status
helm status apache1

# See release history
helm history apache1
```

###  🔄 Rollback
If something goes wrong, you can rollback to a previous revision:
```bash
# Rollback to previous revision
helm rollback apache1 1
```