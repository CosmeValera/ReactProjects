# 🚢 KUBERNETES 2

## 🖥️ Local Installation

**Options:** Minikube, Docker Desktop, Microk8s, k3s, KinD, RKE2

**Minikube**
- **Official** Kubernetes tool
- Most compatible with K8s
- Uses a VM
- High resource usage

**Docker Desktop**
- **Compatibility issues**
- High resource usage

**Microk8s**
- Linux only
- Lightweight binary
 
**k3s**
- Lightweight binary
- Designed for IoT, also used for CI/CD

**KinD (K8s in Docker)**
- K8s running inside Docker
- Designed for CI/CD

**RKE2**
- Rancher’s next-generation Kubernetes distribution
- Lightweight and secure
- Commonly used for production environments and CI/CD pipelines

## ☁️ Cloud Installation

**Options:** EKS, AKS, GKE, Digital Ocean, OpenShift, Rancher.

- **GKE**: Google Cloud
- **AKS**: Azure
- **EKS**: AWS
- **Digital Ocean**: Cheapest option
- **OpenShift**: For datacenters
- **Rancher**: For datacenters

## `kubeCtl` commands
**Get all components in the cluster**
```sh
kubectl get all
```

**Apply all files**
```sh
kubectl apply -f .
```

**Delete all files from the cluster**
```sh
kubectl delete all --all
```
> **Warning:** Use with caution to avoid accidental data loss

**Forward a port**
```sh
# Example
kubectl port-forward service/result 4100:80
```
```sh
# Command
kubectl port-forward <pod-name|service-name> <local-port>:<component-port>
```