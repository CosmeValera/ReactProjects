<!-- https://gmv.udemy.com/course/3231011/enroll/ -->

# 🚢 KUBERNETES 5 (HELM)
Helm is a package manager for kubernetes.

### Installation
Install Helm: [Click here](https://helm.sh/)

### Webpage
Helm Charts: [Artifact Hub](https://artifacthub.io/)

## Install Repository and Chart (Basic example)
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
**Update the repository to get the latest chart versions**
```sh
helm repo update

# Output: 
# Hang tight while we grab the latest from your chart repositories...
# ...Successfully got an update from the "bitnami" chart repository
# Update Complete. ⎈Happy Helming!⎈
```
**Let's install a Helm chart from `Bitnami`**
```sh
helm install my-nginx bitnami/nginx --version 19.0.0

# Output: 
# Error: INSTALLATION FAILED: Kubernetes cluster unreachable: Get "https://127.0.0.1:32769/version": dial tcp 127.0.0.1:32769: connect: connection refused
```

However, before installing a chart, ensure Minikube is running, because helm needs a cluster.

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