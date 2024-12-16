<!-- https://www.udemy.com/course/kubernetes-para-desarrolladores -->

# 🚢 KUBERNETES 2

## 🖥️ Local Installation

**Options:** Minikube, RKE2, KinD, Microk8s, k3s

**Minikube**
- **Official** Kubernetes tool
- Most compatible with K8s
- Uses a VM
- High resource usage

**RKE2**
- Rancher’s next-generation Kubernetes distribution
- Lightweight and secure
- Commonly used for production environments and CI/CD pipelines

**KinD (K8s in Docker)**
- K8s running inside Docker
- Designed for CI/CD

**Microk8s**
- Linux only
- Lightweight binary
 
**k3s**
- Lightweight binary
- Designed for IoT, also used for CI/CD

## ☁️ Cloud Installation

**Options:** EKS, GKE, AKS, OpenShift, Oracle Cloud (OKE), Alibaba Cloud, ArgoCD, KubeSphere

- **EKS**: AWS
- **GKE**: Google Cloud
- **AKS**: Azure
- **OpenShift**: Enterprise
- **Oracle Cloud (OKE):** Oracle
- **Alibaba Cloud:** Asia-Pacific
- **ArgoCD**: GitOps
- **KubeSphere**: Multi-cluster

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
# Delete all resources in the cluster
kubectl delete all --all

# Delete resources in the current directory
kubectl delete -f .
```
> **Warning:** Use with caution to avoid accidental data loss

**Forward a component** (`port-forward`)
```sh
# Example
kubectl port-forward service/result 4100:80
```
```sh
# Command
kubectl port-forward <pod-name|service-name> <local-port>:<component-port>
```

**See logs of a component**
```sh
kubectl logs <pod-name|service-name> -f
```
> Use the `-f` flag to stream logs
> 
**Enter a component**
```sh
kubectl exec -it <pod-name|service-name> -- sh
```

**Obtain yaml of a component**

`metadata`, `spec`, `status` are displayed
```sh
kubectl get <pod-name|service-name> -oyaml
```

**Edit yaml of a component (hot)**
```sh
kubectl edit <component-name>
```

**Delete a component**
```sh
kubectl delete <component-name>
```

## 🥙🥙 Components
### Pods
> **See `README.md`**

### ReplicaSet
- Used for Stateless application
- It's an abstraction
  - **ReplicaSet** contains Pods
  - **Deployment** contains ReplicaSet
- Provides scaling
- Handles failure response

> You can create **Pods** and **ReplicaSets** in Kubernetes, but usually, **Deployments** are chosen for managing scaling, rolling updates, and self-healing.
### Deployment
> **See `README.md`**

**Commands**

Deployments allow you to manage versions, scaling, and rollback easily.

Let's see a `rollout` example:
1. Apply a file:
    ```sh
    kubectl apply -f deployment.yaml
    ```
2. Make changes to the pods in the Deployment file
3. Reapply the file using `apply` (**Step 1**)
4. New pods will be create and the old replicaset will have no pods:
    ```sh
    kubectl get all
    ```
    Example output:
    ```js
    NAME                              READY   STATUS    RESTARTS   AGE
    pod/deployment-787cd94984-4n6sp   1/1     Running   0          100s
    pod/deployment-787cd94984-5zxqk   1/1     Running   0          91s
    pod/deployment-787cd94984-vmpgw   1/1     Running   0          96s

    NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
    service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8m43s

    NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/deployment   3/3     3            3           8m29s

    NAME                                    DESIRED   CURRENT   READY   AGE
    replicaset.apps/deployment-647584586d   0         0         0       8m29s
    replicaset.apps/deployment-787cd94984   3         3         3       100s
    ```
5. Roll back to the previous ReplicaSet (which means new pods will be created):
    ```sh
    kubectl rollout undo deployment.apps/deployment
    ```
6.  Or restart the version and create a completely new ReplicaSet:
    ```sh
    kubectl rollout restart deployment.apps/deployment
    ```
> If you are using `port-forward` remember to update the command with the new pod/service.

### Service
> **See `README.md`**