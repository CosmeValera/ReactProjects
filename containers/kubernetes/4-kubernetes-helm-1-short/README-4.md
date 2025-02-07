<!-- https://www.youtube.com/watch?v=-ykwb1d0DXU -->

# 🚢 KUBERNETES 4 (HELM)
Helm is a package manager for kubernetes.
- To package YAML files and distribute them in public and private repositories.
- Like apt, zypper or homebrew

## 1. Helm Charts
Helm Charts solve a critical problem in Kubernetes: **repetitive and error-prone YAML configuration.** Without them, developers and operators would need to manually write (and rewrite) complex YAML files for common applications like databases or monitoring tools. Helm Charts act as reusable templates, allowing teams to standardize deployments, share configurations, and avoid reinventing the wheel for every project or environment.

- Bundle of YAML Files (*preconfigured for common use cases*)
- Create your own Helm Charts with Helm
- Push them to Helm Repository
- Download and use existing ones

**Examples:**
- Database apps
  - `ElasticSearch`
  - `MySQL`
- Monitoring apps
  - `Prometheus`

## 2. Templating Engine
If you have a case where you have a lot of microservices or pods that are the same but only change in a value, instead of having to rewrite all of them one by one, you can use this template system with Helm.


**Advantages:**
- It is practical for CI/CD
- In your Build you can replace the values on the fly

**Steps:**
1. Define a common blueprint
2. Dynamic values are replaced by placeholders

`my-pod.yaml`:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: {{ .Values.name }}
spec:
  containers:
  - name: {{ .Values.container.name }}
    image: {{ .Values.container.image }}
    port: {{ .Values.container.port }}
```

`values.yaml` (the file with the values):
```yaml
name: my-app
container:
  name: my-app-container
  image: my-app-image
  port: 9001
```

## 3. Same application across different environments

In this case, instead of deploying all the YAML files, individually in each cluster environment. We can package them up, to make an application that will have all the yaml files. And this chart can be used to redeploy the same application into different kubernetes cluster environments

**Example:**
```sh
helm install my-app ./my-chart --values=prod-values.yaml  
```

## Helm chart structure
