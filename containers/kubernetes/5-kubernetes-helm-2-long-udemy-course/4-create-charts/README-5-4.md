# 📦 Create Charts

## 📦 Chart parts

| File/Directory | Description |
|---------------|-------------|
| Chart.yaml | YAML file that contains metadata about the chart like version, name and dependencies |
| LICENSE | Optional file containing the license for the chart |
| README.md | Optional file containing information about the chart |
| values.yaml | Default configuration values for the chart |
| values.schema.json | (Optional) JSON schema for the values file |
| charts/ | Directory containing all charts (dependencies) |
| templates/ | Directory containing all template files |
| templates/NOTES.txt | (Optional) file containing notes for the chart |

## 📦 Create a Chart

```bash
helm create my-chart
```

### Deploy a Chart

```bash
helm install app-nginx ./my-chart
```

#### Other options 

```bash
# Dry run to see what will be deployed
helm install --dry-run app-nginx ./my-chart 

# Dry run with debug for more details
helm install --dry-run --debug app-nginx ./my-chart   
```

### Delete a Chart

```bash
helm ls
helm status app-nginx
helm delete app-nginx
```



