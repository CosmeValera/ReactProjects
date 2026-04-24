<!-- https://www.youtube.com/watch?v=buHYhCyfTKk -->
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
user@wsl-machine$ stern -s 1m nginx
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
user@wsl-machine$$ kubectl exec -it pod/nginx-02 -- sh
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

## New case: Configmap
```sh
kubectl apply -f 01-pod.yaml
# kubectl apply -f 02-pod.yaml
kubectl apply -f 03-service-node-port.yaml
# kubectl apply -f 04-pod-downwardapi.yaml
kubectl apply -f 05-pod-configmap.yaml
kubectl apply -f 06-index-configmap.yaml
kubectl get all
```

```sh
kubectl delete pod/nginx-01
kubectl delete pod/nginx-02
kubectl delete service/nginx
```

En este caso al aplicar el curl, lo que hará será devolver el contenido del configmap:
```sh
user@wsl-machine$ curl 192.168.49.2:30000
Hola soy una configmap
```

In the pod you're saying:
- Use the ConfigMap named `index-html`.
- Mount the key `index.html` from that ConfigMap.
- Make it available as a file named `index.html` in the mounted volume.

In the container:
- Mount the volume named `index` into the container.
- Make it accessible at the path `/usr/share/nginx/html` (which is where nginx serves HTML by default).

Also, in this example, if you execute the curl several times, sometimes will answer the pod with the configmap, and sometime will answer the pod with the value that we set inside the minikube node:
```sh
user@wsl-machine$ curl 192.168.49.2:30000
Te lo cambio de nuevo jeje
user@wsl-machine$ curl 192.168.49.2:30000
Hola soy una configmap
```

---
# CAMBIO A `2-pelado-test-2`
## PVC + Cloud Exercise

### New case: Configmap
```sh
kubectl apply -f 01-pvc.yaml
kubectl apply -f 02-pod.yaml
kubectl get all,pvc,pv
```

```sh
kubectl delete pod/nginx-01
kubectl delete pvc nginx-pvc
```

This is a connection on cloud with Digital Ocean, it will not work straightaway, the pod will look like never ready. You would need to be connected to Digital Ocean for this to work, If not it would look like this:
```sh
user@wsl-machine$ kubectl get all,pvc,pv
NAME           READY   STATUS    RESTARTS   AGE
pod/nginx-01   0/1     Pending   0          3m21s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   75m

NAME                              STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS       VOLUMEATTRIBUTESCLASS   AGE
persistentvolumeclaim/nginx-pvc   Pending                          
            do-block-storage   <unset>                 3m22s
```


---
# CAMBIO A `3-pelado-test-3`
## Statefulset Exercise

```sh
kubectl apply -f 01-mongo-simple.yaml
kubectl apply -f 02-mongo-service.yaml
kubectl get all
```

```sh
kubectl delete statefulset.apps/mongo
kubectl delete service/mongo
```

La diferencia, entre el Statefulset y el deployment es q aquí los pods se crearon en orden, y también que los nombres son así: `pod/mongo-0`, `pod/mongo-1` y `pod/mongo-2`. Y no con esos hashes tan largos.

Si está bien configurado el service, el ping debería funcionar
```sh
user@wsl-machine$ k exec -it pod/mongo-0 -- sh

$ ping mongo-2.mongo
```

Damos de alta el servicio de mongo ahora:
```sh
user@wsl-machine$ k exec -it pod/mongo-0 -- sh

$ mongo
MongoDB shell version v3.4.1
connecting to: mongodb://127.0.0.1:27017
...

> rs.status()

> rs.initiate({_id: "rs0", members: [ { _id: 0, host: "mongo-0.mongo:27017"} ]})

> rs.add("mongo-1.mongo:27017")
> rs.add("mongo-2.mongo:27017")

> rs.status()
```

But, now, instead of having to do all of this manually, let's create a ConfigMap to automatize this process:

```sh
# kubectl apply -f 01-mongo-simple.yaml
kubectl apply -f 02-mongo-service.yaml
kubectl apply -f 03-mongo-configmap.yaml
kubectl apply -f 04-mongo-full.yaml
kubectl get all
```

```sh
kubectl delete statefulset.apps/mongo
kubectl delete service/mongo
kubectl delete configmap mongo-init
kubectl get all
```

> Funciona pero he tenido que cambiar los ficheros, pq lo q salía en el vídeo para el confimgap y el statefulset no levantaba los pods, y cuando los levantaba daba errores. Es lo q está con `03-original.yaml` y `04-original.yaml`. Por eso, los ficheros han cambiado en `03-mongo-configmap.yaml` y `04-mongo-full`. El statefulset ahora usa 'volumeClaimTemplates', initContainer y un script largo, cosa que en el vídeo no se usa, pero bueno. La idea que es automatizar sí que está ocurriendo. Este es el vídeo de ahora: https://www.youtube.com/watch?v=Gp6LNymkw70

---
```sh
# kubectl apply -f 01-mongo-simple.yaml
kubectl apply -f 02-mongo-service.yaml
kubectl apply -f 03-mongo-configmap.yaml
kubectl apply -f 04-mongo-full.yaml
kubectl apply -f 06-node-app-svc.yaml
kubectl apply -f 05-node-app.yaml
kubectl get all
```

```sh
kubectl delete statefulset.apps/mongo
kubectl delete service/mongo
kubectl delete configmap mongo-init
kubectl delete service/node-mongo
kubectl delete deployment.apps/node-mongo
kubectl get all
```

> It's important to do `docker pull husseingalal/letschat2` and `minikube load husseingalal/letschat2`, so that minikube's containers can access to it.
> Everything looks up, and should communicate but it is not working xd


## Final:

3 differences between Statefulsets and Deployments:
- Pod names are incremental in Statefulsets: `mongo-0`, `mongo-1` and `mongo-2`
- Pods are created one by one 
- And die one by one too

This predicatble, persistent names make the pods easier to discover and configure.