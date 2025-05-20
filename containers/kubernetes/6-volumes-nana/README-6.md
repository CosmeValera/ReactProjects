<!-- https://www.youtube.com/watch?v=0swOh5C3OVM -->
## 🚢 Volumes in k8s (PV, PVC, SC...)
To persist data in K8s using volumes, we will see the following components:
- **Persistent Volume**
- **Persistent Volume Claim**
- **Storage Class**

### 🧠 Why?
Imagine you have 2 pods: `my-app` and `mysql`. With `my-app` you add and update data to the db `mysql`. 

However, by default, when you restart the `mysql` pod, all those changes get lost. This is because, **Kubernetes doesn't provide data persistence out of the box**, you need to configure that. For this, you need to have storage that doesn't depend on the pod lifecycle.