[](https://www.youtube.com/watch?v=s_o8dwzRlu4)
# KUBERNETES

## 🧠 What?
It's an orchestration tool, to manage multiple containers.
- High availability
- Scalability
- Disaster recovery

## 🗄️ Architecture
- Master node
- Several Kubelet (Worker nodes)
  The worker nodes have the applications running

### Master node
It has several kubernetes processes:
- API Server (a container): It's the entry point of a K8s cluster
- Controller Manager: Keeps track of whats happening in the cluster
- Scheduler: Ensures Pods placement
- etcd: Kubernetes backing store