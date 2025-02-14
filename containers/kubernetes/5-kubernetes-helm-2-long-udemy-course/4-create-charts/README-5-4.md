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