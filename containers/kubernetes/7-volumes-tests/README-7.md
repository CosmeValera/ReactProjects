## Volumes tests

In this folder, there are different tests for different configurations with `PV`, `PVC`, `SC` and `volumeClaimTemplates`.

### Commands

```sh
kubectl apply -f 01-pod.yaml
kubectl apply -f 02-pod.yaml
kubectl apply -f 03-service-node-port.yaml
kubectl get all
```

```sh
kubectl delete pod/nginx-01
kubectl delete pod/nginx-02
kubectl delete service/nginx
```

To receive the changes:
```sh
stern -s 1m nginx
```

To send curls:
```sh
curl 192.168.49.2:30000
```
> 192.168.49.2 is minikube ip. 
> 
> 30000 is the Nodeport nodeport.

This is the result:
```sh
cosme@LTCOVR:/mnt/c/Users/covr/OneDrive - gmv.com/Desktop/Cosme (Local)/ReactProjects/containers/kubernetes/7-volumes-tests/1-pelado-test$ stern -s 1m nginx
+ nginx-02 › nginx
+ nginx-01 › nginx
nginx-01 nginx 10.244.0.1 - - [21/May/2025:10:43:13 +0000] "GET / HTTP/1.1" 200 20 "-" "curl/7.81.0" "-"
nginx-02 nginx 10.244.0.1 - - [21/May/2025:10:43:26 +0000] "GET / HTTP/1.1" 200 20 "-" "curl/7.81.0" "-"
```
As we can see thanks to `stern`. The Nodeport is balancing the load, sending one request to the nginx-01, and the next request to nginx-02, and so on.

## New case: downwardapi

```sh
kubectl apply -f 01-pod.yaml
# kubectl apply -f 02-pod.yaml
kubectl apply -f 03-service-node-port.yaml
kubectl apply -f 04-pod-downwardapi.yaml
kubectl get all
```

```sh
kubectl delete pod/nginx-01
kubectl delete pod/nginx-02
kubectl delete service/nginx
```

```sh
wsl-machine$ kubectl exec -it pod/nginx-02 -- sh
$ cd /etc/podinfo
$ ls
annotations  labels
$ cat labels
app="nginx"
$ cat annotations
kubectl.kubernetes.io/last-applied-configuration="{\"apiVersion\":\"v1\",\"kind\":\"Pod\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"nginx\"},\"name\":\"nginx-02\",\"namespace\":\"default\"},\"spec\":{\"containers\":[{\"image\":\"nginx\",\"name\":\"nginx\",\"volumeMounts\":[{\"mountPath\":\"/etc/podinfo\",\"name\":\"podinfo\"}]}],\"volumes\":[{\"downwardAPI\":{\"items\":[{\"fieldRef\":{\"fieldPath\":\"metadata.labels\"},\"path\":\"labels\"},{\"fieldRef\":{\"fieldPath\":\"metadata.annotations\"},\"path\":\"annotations\"}]},\"name\":\"podinfo\"}]}}\n"
kubernetes.io/config.seen="2025-05-21T11:01:28.366555003Z"
kubernetes.io/config.source="api"
```
This could be useful to share information about the pod, like labels, annotations, CPU/RAM memory limits, and so on.