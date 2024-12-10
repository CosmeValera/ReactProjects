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

## 🥙 Kubernetes components

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
- Abstracts the complexity of managing Pods:
  - Pods abstract containers
  - Deployments abstract Pods

**StatefulSet**

- Designed for stateful applications where data consistency and order are crucial, such as:
  - MySQL
  - postgreSQL
  - mongoDB
- Unlike Deployments, StatefulSets ensure that:
  - Each Pod has a unique, stable identity (e.g., pod-0, pod-1).
  - Pods are created, deleted, and scaled in a defined order.
  - Persistent storage is tied to specific Pods.
- Databases often require this to control read/write consistency.

> Note: Deploying StatefulSets can be complex, so databases are frequently hosted outside the Kubernetes cluster.

## 🛠️ Kubernetes configuration
We send requests to the master node to configure Kubernetes using:
- **UI**, **API**, or **CLI**

Configuration files are written in:
- **YAML** or **JSON**

### YAML example:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-image
        env:
          - name: SOME_ENV
            value: $SOME_ENV
        ports:
        - containerPort: 80
```

- **replicas:** Defines the number of Pod replicas (2 in this case)
- **selector** (Deployment's selector): Ensures the Deployment manages Pods with the specified labels(`app: my-app`)
- **template** (Pod's template): The template in Deployment is the blueprint to create Pods. Describes the Pods, including the container's image (`my-image`), the env variables(`SOME_ENV`) and exposed port(`80`).

### Parts of a K8s Configuration File:

Examples of `deployment` and `service` files:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels: ...
spec:
  replicas: 2
  selectors: ...
  template: ...
```
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector: ...
  ports: ...
```

Each configuration file has 3 parts:
1. **Metadata**: Includes information like the component's name and labels.
2. **Specification:** Defines the desired state, which varies by component type (e.g., replicas for Deployments, ports for Services).
3. **Status:** Automatically generated and added by Kubernetes.

### How `Status` work
Kubernetes continously compares the **desired state**(from YAML files) with the **current state**(tracked in `Status`).
- If there’s a mismatch, Kubernetes attempts to resolve it.
- Example:
  - Desired state: 2 replicas in the `Deployment`.
  - Current status: Only 1 replica is running.
  - Kubernetes identifies the difference and creates another replica to match the specification.

### Where `Status` Data Comes From

The Status data is stored in **etcd**, Kubernetes' key-value store.
- **etcd** holds the cluster's current state for all components.
- Kubernetes uses this data to track and manage the state of the cluster.

## 🧰 Minikube and kubectl
### Minikube and Kubectl

**Minikube:**

A tool to run Kubernetes locally on your machine. It creates a small, single-node Kubernetes cluster, perfect for learning and testing.

**kubectl:**

The command-line tool to interact with Kubernetes clusters. Use it to deploy applications, manage resources, and inspect the cluster's state.

### Cluster Setup (Minikube)
In a typical **production** cluster setup, you will have
- Multiple Master and Worker nodes run accross separate virtual or physical machines

However, for local testing, setting up such a complex cluster can be challenging.

**Minikube** simplifies this by running both master and worker processes on a single node.
This node also has Docker preinstalled, so you can run containers or Pods locally with ease, all in one compact environment.

### Kubectl
It's the **command line tool** for K8s cluster

One of the Master processes, the `Api Server`, is responsible for handling cluster interactions. . You can access the API Server through:
- UI
- API
- **CLI (`Kubectl`)**

Kubectl is the most powerful of these clients.

In a **minikube** setup, kubectl enables you to communicate not only with the master processes but also with the worker processes. This allows you to:
- Enable pods to run on the node
- Create and manage pods
- Create services
- Destroy pods
- And much more

> Note: Kubectl isn’t just for Minikube. It’s the primary tool to interact with any Kubernetes cluster setup, whether it’s Minikube or a production-grade cluster.