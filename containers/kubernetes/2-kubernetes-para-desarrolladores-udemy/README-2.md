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

## `kubectl` commands
**Get or describe components**
```sh
# Get all resources in the cluster
kubectl get all

# Get one kind
kubectl get pod | configmap | secret | ...
```
If you want more detailed information than **get** provides, use the **describe** command:
```sh
kubectl describe service <service-name>
```


**Apply all files**
```sh
kubectl apply -f .
```

**Delete a component**
```sh
kubectl delete <component-name>
```
**Delete all files from the cluster**
```sh
# Delete all resources in the cluster
kubectl delete all --all

# Delete resources in the current directory
kubectl delete -f .
```
> **Warning:** Use with caution to avoid accidental data loss

**See logs of a component**
```sh
kubectl logs <pod-name|service-name> -f
```
> Use the `-f` flag to stream logs
 
**Forward a component** (`port-forward`)
```sh
# Example
kubectl port-forward service/result 4100:80
```
```sh
# Command
kubectl port-forward <pod-name|service-name> <local-port>:<component-port>
```

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

## 🥙🥙 Components (2)
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

    **Command:**
    ```sh
    kubectl get all
    ```

    **Output:**
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

### Ingress

An Ingress is a proxy in Kubernetes that routes external HTTP/HTTPS requests to internal services based on defined rules, enabling user-friendly URLs like `my-app.com`.

Example with 2 services and 1 Ingress.

**Service A:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: service-a
spec:
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: app-a
```

**Service B:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: service-b
spec:
  ports:
    - port: 80
      targetPort: 8081
  selector:
    app: app-b
```

**Ingress:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /app1
            pathType: Prefix
            backend:
              service:
                name: service-a
                port:
                  number: 80
          - path: /app2
            pathType: Prefix
            backend:
              service:
                name: service-b
                port:
                  number: 80
```

**Enable Ingress**

The first time you need to enable Ingress in Minikube, run the following command:

```sh
minikube addons enable ingress
```

**Verifying Ingress**

To see the ingress resources, `kubectl get all` won't show it. Use this:
```sh
kubectl get ingress
```
If ingress is enabled, you should be able to see the port:
```js
NAME         CLASS    HOSTS         ADDRESS        PORTS   AGE
my-ingress   <none>   example.com   192.168.49.2   80      8m57s
```

**Access:**
- `example.com/app1` → `Service A`.
- `example.com/app2` → `Service B`.

### Volume
Let's create a StatefulSet linked to a PersistentVolumeClaim.

**StatefulSet**
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db
spec:
  serviceName: db
  replicas: 1
  selector:
    matchLabels:
      app: db
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
      - image: postgres:9.4
        name: db
        ports:
        - containerPort: 5432
        volumeMounts:
        - mountPath: /var/lib/postgresql/data
          subPath: data
          name: data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: db-storage
          readOnly: false
```

**Volume**
```yaml
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-storage
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

To check, run:
```sh
kubectl apply -f volume.yaml # Apply file

kubectl get pvc # Show Volume

kubectl get all # Show StatefulSet
```

## ⛵ Kubernetes (k8s) Development Cycle

### (1) Initial Setup
**1. Prepare Required Files**
   1. **Application Code:** Develop the software for your application
   2. **Dockerfile:** Write a `Dockerfile` to containerize your application
   3. **Kubernetes YAML Files:** Create configuration files for your Kubernetes deployment, service, and other required resources (e.g., `deployment.yaml`, `service.yaml`).


**2. Build and Deploy Docker Image**
1. **Build Docker Images:**
    ```sh
    docker build -t my-user/vote-app:vote .
    ```
    - This command builds a Docker image from the `Dockerfile` in the current directory (`.`).
    - The image will be tagged as `my-user/vote-app:vote`.

2. **Run Docker Container:**
    ```sh
    docker run -d --name my-user/vote-app-container my-user/vote-app
    ```
    - This starts a new container in detached mode (`-d`) using the `my-user/vote-app:vote` image.
  	- The container will be named `vote-app-container`.

**3. Deploy to Kubernetes**

Apply the Kubernetes configuration files:
```sh
kubectl apply -f <k8s-file>
```
Replace `<k8s-file>` with the path to your YAML file (e.g., `deployment.yaml`).

### (2) Making Changes and Redeploying

**1. Rebuild the Docker Image**

After making changes to your application:
```sh
docker build -t my-user/vote-app:vote .
```

**2. Push the Updated Image (for Cloud Deployments)**
```sh
docker push my-user/vote-app:vote
```

**3. Pull the Updated Image (if necessary)**

Ensure Kubernetes nodes have the latest image. If the deployment uses the `imagePullPolicy: Always` field, this step is automatic:
```sh
docker pull my-user/vote-app:vote
```

**4. Restart Kubernetes Deployment**

Force a rolling restart to redeploy the updated application:
```sh
kubectl rollout restart vote
```

### (3) Automating with Skaffold
Skaffold simplifies the Kubernetes development workflow by automating the build, push, and deploy steps. Here’s how you can use it:

**1. Install Skaffold**
[Click here](https://skaffold.dev/)

**2. Create a `skaffold.yaml` File**

Define the Skaffold configuration for your project. Here’s an example:

```yaml
apiVersion: skaffold/v2beta26
kind: Config
metadata:
  name: vote-app
build:
  artifacts:
  - image: my-user/vote-app:vote
    context: .
deploy:
  kubectl:
    manifests:
    - k8s/deployment.yaml
    - k8s/service.yaml
```
- Replace `my-user/vote-app:vote` with your image name.
- Specify the paths to your Kubernetes YAML files under `manifests`.

**3. Run Skaffold**
```sh
skaffold dev
```
- The `skaffold dev` command watches for changes in your project and triggers the build, push, and deploy steps automatically.
- Any changes in the source code will be detected, and Skaffold will redeploy the application.

**4. Additional Skaffold Commands**
- Run without Watching:
  ```sh
  skaffold run
  ```
  This executes the workflow once without watching for file changes.

- Clean Up Resources:
  ```sh
  skaffold delete
  ```
  This removes the deployed Kubernetes resources.

