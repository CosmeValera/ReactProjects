# 🚢 KUBERNETES 2

## 🪱 Local Installation

### Options:
- Minikube
- Docker Desktop
- Microk8s
- k3s
- KinD

### Minikube
- **Standard**
- Official by Kubernetes people
- It's the most compatible with K8s
- Uses a VM
- The one that most resources needs

### Docker Desktop
- **Problems with compatibility**
- Uses a VM
- Uses a lot of resources

### Microk8s
- **Only for Linux**
- Supported by K8s
- It's a binary
 
### k3s
- **It's a very lightweight binary**
- Supported by K8s
- Developed to be used for IoT products
- People have started using it for CD too
- It can also run in a container, being similar to KinD

### KinD (K8s in Docker)
- **It's all k8s running inside a docker container**
- Supported by K8s
- The idea is to be used for CI
- People have started using it for CD too