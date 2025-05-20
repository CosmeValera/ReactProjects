<!-- https://www.youtube.com/watch?v=0swOh5C3OVM -->
## 🚢 Volumes in k8s (PV, PVC, SC...)
To persist data in K8s using volumes, we will see the following components:
- **Persistent Volume**
- **Persistent Volume Claim**
- **Storage Class**

### 🧠 Why?
Imagine you have 2 pods: `my-app` and `mysql`. With `my-app` you add and update data to the db `mysql`. 

However, by default, when you restart the `mysql` pod, all those changes get lost. This is because, **Kubernetes doesn't provide data persistence out of the box**, you need to configure that for each application that needs saving data between pods restart.

### 🫙 Storage requirements
For this, 1. you need to have storage that **doesn't depend on the pod lifecycle**.

However, you don't know from which node will the pod restart in. 2. So the storage must be **available to all nodes***. 

And, 3. Storage needs to **survive** even if **cluster crashes**.

<small> *Minikube has by default only one node that acts as both master and worker. You can try commands: `kubectl get nodes` and `minikube node add`</small>

### Another use case for persistent storage
Instead of a database, it can also be used for persistent storage, e.g. `my-app` writes/reads from a file or folder (e.g. about the app configuration, session data, etc).

> About the resilience of the information, whether using just a PV, or also PVCs, there are 2 types.
> - **Local storage:** data is tied to a specific node. Data will survive a pod fail 👍, but not a node fail 👎 (This violates principles 2 and 3 of *🫙 Storage requirements*)
> - **Cloud/Network storage:** data resides on a external storage, and different nodes can access it. Data will survive a pod fail 👍, and will survive a node fail 👍. (No violations. Recommended in most scenarios)

<!-- ## 🛄📝 PersistentVolumeClaim
## 🏫🧑‍🏫 StorageClass -->

## 📦💾 PersistentVolume
PersistentVolume is a cluster resource, ñik