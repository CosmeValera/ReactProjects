<!-- https://www.youtube.com/watch?v=zQyrhjEAqLs -->

# ☁️ AWS (Midu tutorial)

## 🤔 Why?
Amazon Web Services (AWS) is the world’s most comprehensive and broadly adopted cloud. It counts with +200 different services, for things like: servers, databases, object storage, user management and more.

### 🗂️ Quick scheme with the most important services
| AWS Service   | What it is / What it’s for                           | Equivalent you may know                         |
|---------------|------------------------------------------------------|------------------------------------------------|
| **EC2**       | Scalable virtual servers in the cloud                | Like renting a server from a hosting provider (Blacknight, OVH) where you install Apache, Nginx, Docker, etc.  |
| **S3**        | Object storage (files, backups, static assets) via API | Google Drive for apps / MinIO bucket           |
| **RDS**       | Managed relational databases (MySQL, Postgres, etc.) | MySQL/Postgres on a server, but auto-managed   |
| **EKS**       | Managed Kubernetes service                           | Minikube / RKE2 cluster on your machine        |
| **Lambda**    | Run code on demand without managing servers (serverless) | Cron/event-driven script, but in the cloud     |
| **CloudFormation** | Infrastructure as code definition. Define AWS resources (servers, DBs, buckets) as code, auto-create them.   | Terraform (similar), not like Ansible/Rundeck  |

### ↕️ Vertical scaling vs ↔️ horizontal scaling
- **Vertical scaling**: Add more power (CPU/RAM) to a single server.  
  - Pros: simpler, cheaper, usually better cost efficiency.  
  - Cons: downtime when upgrading.  

- **Horizontal scaling**: Add more servers to handle load.  
  - Pros: no downtime.  
  - Cons: more complex, more expensive.  

## 🥰 Services

### 😊 EC2 (Elastic Cloud Computing)
x