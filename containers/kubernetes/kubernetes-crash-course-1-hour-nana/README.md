[](https://www.youtube.com/watch?v=s_o8dwzRlu4)
# KUBERNETES

## 🧠 What?
It's an orchestration tool, to manage multiple containers.
- High availability
- Scalability
- Disaster recovery

## 🗄️ Architecture
- Master node
- Several Kubelet (Worker nodes)
  The worker nodes have the applications running

### Master node
It has several kubernetes processes:
- API Server (a container): It's the entry point of a K8s cluster
- Controller Manager: Keeps track of whats happening in the cluster
- Scheduler: Ensures Pods placement
- etcd: Kubernetes backing store

### Architecture in general
- Master nodes: 
  - Control plane nodes
  - Handful of master processes
  - Much more important
    - It is absolutely necessary to have a backup of the master
- Worker nodes: 
  - Higher workload
  - Much bigger and more resources

## 🥙 Kubernetes component

### List
- Node
- Pod
- Service
- Ingress
- ConfigMap
- Secret
- Deployment
- StatefulSet
- DaemonSet

### Node and Pod

**Node:** Virtual or physical machine

**Pod:**
- Is the smallest unit in Kubernetes (it's a node)
- Abstraction over container
- Usually 1 Application per Pod
- Each pod gets its own IP address
- Pods are ephimeral (They can die easily)
- New IP address on recreation

### Service and Ingress

**Service:**
- Permanent IP address
- Lifecycle of Pod and Service not connected
- It can be used to be attached to a Pod so that when it dies the IP does not change

**Ingress:**
- It transforms the URL from the Node url to something like "my-app.com". It acts like DNS