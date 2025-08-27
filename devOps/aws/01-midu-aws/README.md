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

Also, notice that we created a key pair in the **Key pair (login)** section. When you click on **Create new key pair** the following modal will appear. Once you create them, it's important to save it securely, because anyone that had access to it could access our ec2.

![alt text](image/1.5-key-pair.png)

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

### 🗄️ DynamoDB 💾
**Summary: Key-Value and Document NoSQL Database.** | - - - - - |
DynamoDB is a NoSQL database. It supports both key-value and document data models. It is very fast; can be used for low-latency games, or real-time analytics apps.


### 🗄️ MemoryDB 🤓
**Summary: Redis like Service.** | - - - - - |
MemoryDB is a Redis-compatible in-memory database service that stores data in RAM for ultra-fast access, ideal for caching and real-time applications.

### 🗄️ RDS (Relational Database Service)

![alt text](image/7.png)

RDS takes a while to be ready. Once we are done it's important to delete it, because DBMS are pricy.

![alt text](image/7.1.png)

![alt text](image/7.2.png)

As we can see in the image, the endpoint and port are:  `database-cosme.cvcgko0gk8r1.eu-central-1.rds.amazonaws.com` and `3306`.

**Connecting to the database:**

However, if we try it straight away, it won't work:

![alt text](image/7.3.png)

We also need to configure permissions for it to work. The problem is that the Security Group of the network (VPC), doesn't allow access to it through the port 3306.

![alt text](image/7.4.png)

![alt text](image/7.5.png)

![alt text](image/7.6.png)

We have to click in **Edit inbound Rules** to allow our security group access to the database.

![alt text](image/7.7.png)

Add a new rule to allow traffic for the database Mysql from anywhere with ipV4. I also added another rule for ipV6 just in case. For this example, giving access to anyone is enough, but the correct thing to do here, is to grant the access just to who is going to edit it.

![alt text](image/7.8.png)

Click save rules, and now we should be able to access to our RDS. Apparently it's necessary to add also the user. So you need the host (-h), the user (-u), the port (-P), and the password (-p). Like this: `sudo mysql -h database-cosme.cvcgko0gk8r1.eu-central-1.rds.amazonaws.com -u admin -P 3306 -p`.

![alt text](image/7.9.png)

![alt text](image/7.10.png)

And like this we have access to our RDS 🥳!

**Prune unused service:**

Remember to delete the database if you are not going to use it!

![alt text](image/7.11.png)

![alt text](image/7.12.png)

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

### 🔐 IAM (Identity and Access Management)
IAM manages who can access what in your AWS account. It controls users, permissions, and security policies. We will use it to gain access to the webpage we will deploy.

Let's create an user, and say that it can do anything he wants with S3. Also, let's give the user permission to access to aws through a terminal.

![alt text](image/19.png)

![alt text](image/20.png)

![alt text](image/21.png)

![alt text](image/22.png)

![alt text](image/23.png)

![alt text](image/24.png)

![alt text](image/25.png)

![alt text](image/26.png)

Now we have the access key and the secret. We can use the terminal with the client of AWS: `aws`. First, we have to install it. And then we add the key and secret from the IAM.

![alt text](image/27.png)
![alt text](image/28.png)
![alt text](image/29.png)

Now we can go to one of our repositories, to sync the S3, with one of out `dist` or `public` folder projects. To store our repo built project in S3 of AWS, using this command: `aws s3 sync ./public/ s3://cosme-aws-demo-s3`, where *cosme-aws-demo-s3* is the name of our S3.

![alt text](image/30.png)
![alt text](image/31.png)
![alt text](image/32.png)
![alt text](image/33.png)

Great, we have our webpage hosted with S3 🥳🥳

🤔 Notice how you need to add `/index.html` at the end of the URL for it to work. Let's optimize this for static website pages like this one. So we don't need to add it.

**Static Webpage Hosting:**

Let's go to properties of the bucket and the last property is for this. Click **Edit** to **Static website hosting**:

![alt text](image/34.png)

Then you have to enable it. Set index.html as the index document. Add an error Document if applicable. And you can add redirection rules if you want.

S3 static website hosting automatically handles directory-style routing. When someone visits `/about`, S3 will automatically look for `/about/index.html`. Redirection rules are useful for more specific cases like redirecting old URLs to new ones, handling custom URL patterns, or complex routing scenarios.

![alt text](image/35.png)


It's important to notice, that there is a new url for the static webpage. In this case:
- Object URL: `https://cosme-aws-demo-s3.s3.eu-central-1.amazonaws.com/`
- Website URL: `http://cosme-aws-demo-s3.s3-website.eu-central-1.amazonaws.com`

Notice the `s3-website` part in the correct URL!

![alt text](image/36.png)
![alt text](image/37.png)

**What if we change our project?**

In case we change our project, we simplify it, by adding a `deploy` sript in the `package.json`. For example:

![alt text](image/38.png)

![alt text](image/39.png)

> [!IMPORTANT]
> Even better. You can automate this `deploy` script, with `Github Actions`, or with `Jenkins`, so that every time you create a commit, or you merge a branch to main/master, it creates a deployment with the new changes.
> 
> Example: `"deploy": "zola build && wsl aws s3 sync ./public/ s3://cosme-aws-demo-s3"`

### ⚡Lambda (Part 1: Code)

Lambdas are just functions. In this case we are going to use them for the backend.

Let's first create as an example a function called 'checkOnline'.

![alt text](image/40.png)

And here we have the lambda page with the information about it, and the code that will be executed.

![alt text](image/41.png)

Let's test it.

![alt text](image/42.png)
![alt text](image/43.png)

It worked 😊.

It's also important to notice the duration in the response, inside the 'REPORT RequestId' line, since the longer it takes to compute the more expensive it will be. It's always more interesting trying to make lambdas as fast as possible. In this case for example it says: 'Billed Duration: 17 ms'.

We changed the code, to check if an user is online in Twitch (we also changed the theme to monokai in settings->themes->monokai). However, if we execute it right now, it will return the same as before, since the changes haven't been deployed yet. We need to click deploy.

![alt text](image/44.png)

![alt text](image/45.png)

![alt text](image/46.png)

![alt text](image/47.png)

We can see `"body": "{\"online\":true}"`, so it worked. This time it took 2.32 seconds. Another thing to consider is the memory used, this function has a maximum of 128MB, and this function takes up to 84MB, so it's reasonable for now. The limit of 128MB can be increased, but the bigger you make the lambda function's memory the more expensive it will be.

Let's create a new test event where we send as a parameter the value of the user. And in the code we will use `event` to obtain the user, and we will have to deploy it first and then we will test it.

![alt text](image/48.png)

![alt text](image/49.png)

![alt text](image/50.png)

It said that it is offline. Perfect!

**Monitorization**

It's also important to check the monitor section of the page, to check how many times this lambda functions have been executed, how much time did they took and so on.

Also, AWS also provides another service called CLoudWatch to register past executions of our lambda (direct link in the CloudWatch Logs section).

![alt text](image/51.png)

![alt text](image/52.png)

### ⚡Lambda (Part 2: Lambda as an API)

We can use LAMBDA based on a URL, and thus making it be used as an API, by clicking on Function URL. Function URL and Triggers are both inside the configuration section, and are both very interesting.

**Triggers:**

![alt text](image/53.png)

Example: Add Trigger

![alt text](image/55.png)

There are hundreds of possibilities because AWS is also partnered with other companies, for example when the user makes a purchase in Shopify, then it will trigger a lambda here, that will then send them an e-mail.

Or, when in my S3 with my portfolio when the user clicks a button to contact me, then the lambda does something with it, etc.

**Destination:**

You can also add a destination, to where the result of this lambda you want to be sent.

![alt text](image/56.png)

About the destination. For example with the app of Fotocasa, you have a form to contact the owner that is selling a house. And what they do is to have a trigger for when that form is filled, that calls the lambda, and then the lambda has the destination, to redirect the form's information to the home owner.

**Why use a lambda instead of a normal backend?**
Because it's much cheaper, you only pay when it is used. So you don't need to have the server on 24/7.

Another advantage is that, in a normal server with 100 services, if one of them falls, the whole server might be down. However, if you have 100 lambdas each one of them goes on their own, and the fall of one of them won't block the other 99.

**LAMBDA URL**

![alt text](image/54.png)

When creating the Function Url, we can configure it to be accesible only by AWS users, or by anyone. So to make it public let's click NONE.

![alt text](image/57.png)

![alt text](image/58.png)

If we click the link of function URL: `https://svs22pthetusoamgirw76jndre0knhls.lambda-url.eu-central-1.on.aws/`, it says "User not provided". We would need to send a curl or a fetch setting the body with the user, so it works. But there we have the URL accesible publicly 😊👍.

![alt text](image/59.png)

---

🤠 Happy exploring AWS with EC2, S3, RDS, Lambda Functinos and other services!