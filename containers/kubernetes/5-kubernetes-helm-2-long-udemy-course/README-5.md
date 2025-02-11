<!-- https://gmv.udemy.com/course/3231011/enroll/ -->

# 🚢 KUBERNETES 5 (HELM)
Helm is a package manager for kubernetes.

### Installation
Install Helm: [Click here](https://helm.sh/)

### Webpage
Helm Charts: [Artifact Hub](https://artifacthub.io/)

## 🗄️🧩 Install Repository and Chart
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
**Let's install a Helm chart from `Bitnami`**
```sh
helm install my-nginx bitnami/nginx

# Output: 
# Error: INSTALLATION FAILED: Kubernetes cluster unreachable: Get "https://127.0.0.1:32769/version": dial tcp 127.0.0.1:32769: connect: connection refused
```

However, before installing a chart, ensure Minikube is running. Helm requires a Kubernetes cluster to deploy applications. If the cluster isn't running, you'll see an error like `Kubernetes cluster unreachable`.

**Start**
```sh
minikube start
```
**Check that is working**
```sh
kubectl get all
```
**Install an Nginx chart from the Bitnami repository**
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
**Uninstall the Helm release**
```sh
helm uninstall my-nginx

# Output:
# release "my-nginx" uninstalled
```
**Confirm that all resources has been removed**
```sh
kubectl get all

# This ensures that all Kubernetes resources related to the release have been deleted.
```