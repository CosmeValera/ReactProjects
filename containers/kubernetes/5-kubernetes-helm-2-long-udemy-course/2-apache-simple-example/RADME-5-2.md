## Let's deploy an Apache
```sh
helm search repo apache

helm install apache1 bitname/apache

kubectl get all

# It is deployed
# To see it, it's minikubeIp + cluster-port
# However since we have cluster in wsl
# 1. Curl, 2. port-forward

minikube ip
# Output: 192.168.49.2

kubectl get services
# Output:
# NAME         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
# apache1      LoadBalancer   10.103.141.152   <pending>     80:32284/TCP,443:31895/TCP   9m32s
```
### 😇 [Same cluster] See chart in browser
```sh
192.168.49.2:32284 # HTTP
```
```sh
192.168.49.2:31895 # HTTPS
```

### 😇 [Alternative] Access Chart from WSL
```sh
# Port forward http:
kubectl port-forward service/apache1 3100:80
# Google -> localhost:3100

# Port forward https:
kubectl port-forward service/apache1 3100:443
# Google -> localhost:3100
```
We have our first helm chart deployed 🥳🥳

