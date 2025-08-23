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

### 😊 EC2 (Elastic Compute Cloud)

Example configuration of a demo for EC2

![alt text](image/1.png)

Once the EC2 instance has been launched, we can see it if we go to the instances page:

![alt text](image/2.png)

For example, the public address is: `18.185.48.185`. Although if we open it right now, it doesn't show anything. We will see how to make it work in the next section.

**How to connect to the EC2 machine**

1. Click on the button **Connect**
2. Go to **SSH client**
3. Copy the command

![alt text](image/3.png)

4. Apply chmod restrictions to the `.pem` file: 
   1. `chmod 400 ~/.ssh/cosme-demo-ssh.pem`
   2. In windows, you might have to copy the `.pem` file into inside the WSL (as you can see in the next picture).
5. Execute the command to connect with ssh to the EC2 instance.

![alt text](image/4.png)

6. We configure a server with python inside the EC2 instance.

![alt text](image/5.png)

7. We can now connect to the server (make sure to use **http** in the URL since we are using port 80 for the server!)

![alt text](image/6.png)

---

The following services are 🗄️ **Database services.** And we will see a practical example with **RDS (Relational Database Service).**

### 🗄️ DocumentDB 📚
**Summary: MongoDB like Database Service.** | - - - - - |
DocumentDB is a document database service designed to be compatible with MongoDB. It allows developers to store, query, and index JSON-like data at scale.

### 🗄️ DynamoDB ⚡
**Summary: Key-Value and Document NoSQL Database.** | - - - - - |
DynamoDB is a NoSQL database. It supports both key-value and document data models. It is very fast; can be used for low-latency games, or real-time analytics apps.


### 🗄️ MemoryDB 🤓
**Summary: Redis like Service.** | - - - - - |
MemoryDB is a Redis-compatible in-memory database service that stores data in RAM for ultra-fast access, ideal for caching and real-time applications.

### 🗄️ RDS (Relational Database Service)

![alt text](image/7.png)

### 🪣 S3 (Simple Storage Service)

S3 inspired MinIO. Both of them are based on buckets and objects. Objects are static files like images, videos, documents, etc.

S3 is very cheap.

Instead of exposing eveything directly from S3, there is another AWS called CloudFront, that acts like a CDN.

![alt text](image/8.png)

Once it's created we can access it, and create our first objects. Click in the bucket, and then in crete folder.

![alt text](image/9.png)

![alt text](image/10.png)

![alt text](image/11.png)

And now we want to add an image to our folder, first we click on upload, and then we drop the image that we want to store:

![alt text](image/12.png)

![alt text](image/13.png)

![alt text](image/14.png)

![alt text](image/15.png)

![alt text](image/16.png)

However, if we click the Object URL directly to open the image, it is not available. We need to add a policy to the bucket to say who to allow to access it and so on, for now we'll say that anyone can access anything:

![alt text](image/17.png)

![alt text](image/18.png)