[](https://www.youtube.com/watch?v=s_o8dwzRlu4)
# KUBERNETES

## 🧠 What?
It's an orchestration tool, to manage multiple containers.
- High availability
- Scalability
- Disaster recovery

## 🗄️ Architecture
- Master node
- Worker nodes (have the applications running)

### Master node
It has several Kubernetes processes:
- **API Server**: The entry point of a K8s cluster.
- **Controller Manager**: Tracks cluster state and performs corrective actions.
- **Scheduler**: Decides where Pods should be placed.
- **etcd**: A key-value store that holds the cluster's state.

### Architecture in general
- Master nodes: 
  - Control plane nodes
  - Handful of master processes
  - Much more important
    - It is absolutely necessary to have a backup of the master
- Worker nodes: 
  - Higher workload
  - Much bigger and more resources
  - Has a Kubelet to manage Pods locally and communicate with the master.

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

**Node:**
- Virtual or physical machine
- Nodes can be:
  - Master nodes (control plane)
  - Worker nodes (where application Pods run)

**Pod:**
- Is the smallest unit in Kubernetes
- An abstraction over containers
- Usually 1 Application per Pod
- Each pod gets its own IP address
- Pods are **ephemeral** (They can die easily)
  - If a Pod dies, Kubernetes may replace it with a new Pod, which gets a new IP address.

### Service and Ingress

**Service:**
- Permanent IP address
- Lifecycle of Pod and Service not connected
- It can be used to be attached to a Pod so that when it dies the IP does not change

**Ingress:**
- It transforms the URL from the Node url to something like "my-app.com". It acts like DNS

### ConfigMap and Secret