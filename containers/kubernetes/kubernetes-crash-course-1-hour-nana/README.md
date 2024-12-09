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
- **Permanent** IP address
- Lifecycle of Pod and Service not connected
  - If a Pod dies and is replaced, the Service ensures that the node IP does not change (it redirects to the new Pod)
- Acts as a **load balancer** for Pods behind it.

**Ingress:**

From `http://192.168.1.100:30001` to `https://my-app.com`
- Provides **external HTTP and HTTPS access** to services within the cluster.
- Transforms a cluster’s internal service into a user-friendly URL like `my-app.com`.
- **Acts like a reverse proxy**, routing traffic to the appropriate Service based on rules.
- While it provides domain-like URLs, it does not replace DNS:
  - The actual DNS for `my-app.com` must resolve to the cluster's Ingress Controller or Load Balancer IP.

### ConfigMap and Secret

**ConfigMap**
- External Configuration of your application
- ConfigMap is for non-confidentail data only!

**Secret**
- Used to store secret data
  - Passwords, certificates, credentials...
- They are just like confirMap but meant to use encryption by using third-party tools
- Reference Secret in Deployment/Pod

### Volume
- Attaches persistent storage to your Pod, ensuring data is retained even if the Pod restarts or dies.
- Useful for stateful applications, like databases, where data should not be lost.
- Storage can be located:
  - On the local node
  - Externally, outside the Kubernetes cluster

> Kubernetes doesn't manage data persistance!

### Deployment & StatefulSet

**Deployment**
- Blueprint for "my-app" Pods
- You create Deployments, not actual Pods
- It is an abstraction:
  - Pods are an abstraction of containers
  - Deployments are an abstraction of Pods

**StatefulSet**

DB can't be replicated via deployment.
This is because DB have **state**. We need a mechanism to assure which DB are writing to the store, or which PODS are reading to the store. That's why an additional K8s component is needed: StatefulSet

- For STATEFUL apps
  - MySQL
  - postgreSQL
  - mongoDB

However, deploying StatefulSet is not easy, for this reason DBs are often hosted outside of Kubernetes cluster