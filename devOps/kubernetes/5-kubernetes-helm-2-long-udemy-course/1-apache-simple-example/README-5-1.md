## 🚀 Deploy Apache with Helm

### 📦 Chart Installation
```bash
# Search for Apache charts in configured repositories
helm search repo apache

# Install Bitnami Apache chart (correct repo name: bitnami)
helm install apache1 bitnami/apache

# Verify Kubernetes resources. '-o name' to get just the names
kubectl get all -o name
```

### 🌐 Access Methods
**Cluster Details:**
```bash
minikube ip 
# Output: 192.168.49.2

kubectl get services
# Output:
# NAME        TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
# apache1     LoadBalancer   10.103.141.152  <pending>     80:32284/TCP,443:31895/TCP   9m32s
```

> ⚠️ **Note:** LoadBalancer shows `<pending>` because you need to enable Minikube tunnel:
> ```bash
> # Run in separate terminal
> minikube tunnel
> ```

### 😇 [Same cluster] See chart in browser
| Protocol | Address                      | 
|----------|------------------------------|
| HTTP     | `http://192.168.49.2:32284`  |
| HTTPS    | `https://192.168.49.2:31895` |

### 😇 [Alternative] Access Chart from WSL
```bash
# HTTP Access
kubectl port-forward service/apache1 3100:80
# Access at: http://localhost:3100

# HTTPS Access 
kubectl port-forward service/apache1 3101:443
# Access at: https://localhost:3101
```

🎉 **Congratulations!** You've successfully deployed your first Helm chart! 🥳