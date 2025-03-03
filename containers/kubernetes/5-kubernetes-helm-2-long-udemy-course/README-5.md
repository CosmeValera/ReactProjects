<!-- https://gmv.udemy.com/course/3231011/enroll/ -->

# 🚢 KUBERNETES 5 (HELM)
Helm is a package manager for kubernetes.

### Installation
Install Helm: [Click here](https://helm.sh/)

### Webpage
Helm Charts: [Artifact Hub](https://artifacthub.io/)

## 🗄️🧩 Install Repository and Chart

### 🗄️ Repository Management
**Let's add an example repository to Helm: `Bitnami`**
```sh
helm repo add bitnami https://charts.bitnami.com/bitnami

# Output: 
# "bitnami" has been added to your repositories
```
**Check the repository has been added**
```sh
helm repo list

# Output: 
# NAME    URL
# bitnami https://charts.bitnami.com/bitnami      
```
**Update Repositories (Optional)** 

Freshly added repos don't need this, but it's good practice:
```sh
helm repo update

# Output: 
# Hang tight while we grab the latest from your chart repositories...
# ...Successfully got an update from the "bitnami" chart repository
# Update Complete. ⎈Happy Helming!⎈
```

### 🧩 Chart Deployment Workflow
**Let's install a Helm chart from `Bitnami`**
```sh
helm install my-nginx bitnami/nginx

# Output: 
# Error: INSTALLATION FAILED: Kubernetes cluster unreachable: Get "https://127.0.0.1:32769/version": dial tcp 127.0.0.1:32769: connect: connection refused
```

However, before installing a chart, ensure Minikube is running. Helm requires a Kubernetes cluster to deploy applications. If the cluster isn't running, you'll see an error like `Kubernetes cluster unreachable`.

**Before installing a chart, ensure Minikube is running**
```sh
minikube start

kubectl get all # Check
```
**Let's install a Helm chart from `Bitnami` <small>(now having a cluster).</small>**
```sh
helm install my-nginx bitnami/nginx

# Output:
# NAME: my-nginx
# LAST DEPLOYED: Tue Feb 11 13:34:31 2025
# ...
```
- `my-nginx`: Your chosen release name (unique in the namespace)

- `bitnami/nginx`: Chart name from the repository


**Verify that the Nginx deployment is running**
```sh
kubectl get all
```
**Check the status of the Helm release**
```sh
helm list

# Output:
# NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
# my-nginx        default         1               2025-02-11 13:34:31.242650053 +0100 CET deployed        nginx-19.0.0    1.27.4
```
**Get detailed information about the deployed release**
```sh
helm status my-nginx

# This provides detailed information about the Helm release, including its resources and configuration.
```
### 🧹 Cleanup Process
**Uninstall the Helm release**
```sh
helm uninstall my-nginx

# Output:
# release "my-nginx" uninstalled
```
**Confirm that all resources have been removed**
```sh
kubectl get all

# This ensures that all Kubernetes resources related to the release have been deleted.
```

## 🧾 Essential Helm Commands

### 🔍 Search Operations
| Command | Description |
|---------|-------------|
| `helm search hub nginx` | Search Artifact Hub for Nginx charts |
| `helm search repo bitnami` | Search local repos for Bitnami charts |
| `helm search repo nginx --versions` | Show all available versions |

**Examples:**
```bash
# Count Bitnami charts
helm search repo bitnami | wc -l

# Filter output formats
helm search repo bitnami -o yaml  # YAML format
helm search repo bitnami -o json  # JSON format

# Find specific chart version
helm search repo nginx --version 19.0.0
```

### ⚙️ Repository Management
```bash
# Remove repository
helm repo remove elastic

# Show Helm environment variables
helm env  # Displays paths/cache locations
```

### 📚 Obtain information from releases and charts

1. **`helm get` -> Get information about a release.**
   - `helm get all` -> Get all information about a release.
   - `helm get hooks` -> Get hooks about a release.
   - `helm get manifest` -> Get manifest about a release.
   - `helm get metadata` -> Get metadata about a release.
   - `helm get notes` -> Get notes about a release.
   - `helm get values` -> Get values about a release.
2. **`helm show` -> Show information about a chart.**
   - `helm show chart` -> Show chart information.
   - `helm show values` -> Show values information.
   - `helm show readme` -> Show readme information.
   - `helm show notes` -> Show notes information.
   - `helm show values` -> Show values information.

> More about `helm get` and `helm show` in [README-5-2](2-commands-repos-and-charts/README-5-2.md)

### 💡 General Tips
1. Always check chart requirements:
```bash
helm show chart bitnami/nginx  # Display chart metadata
```

2. Dry-run installations:
```bash
helm install --dry-run my-nginx bitnami/nginx  # Simulate installation
```

3. View chart values:
```bash
helm show values bitnami/nginx  # Display customizable parameters
```

4. Upgrade releases:
```bash
helm upgrade my-nginx bitnami/nginx --version 19.1.0  # Specify version
```

5. Rollback changes:
```bash
helm rollback my-nginx 1  # Revert to revision 1
```