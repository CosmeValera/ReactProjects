## Comments in templates
There are two types of comments in templates:
- YAML/Kubernetes comments
- Helm comments

**YAML/Kubernetes comments**
```yaml
# This is a YAML/Kubernetes comment
```

**Helm comments**
```yaml
{{- /* This is a Helm comment */}}
{{- /*
  This is a Multiline Helm comment */
}}
```
> The `-` is used to strip the whitespace from the comment.

The difference between YAML/Kubernetes comments and Helm comments is that YAML/Kubernetes comments are kept in the final manifest, while Helm comments are stripped from the final manifest.

## Variables
To use variables in a chart, you can use the following syntax:

```yaml
{{ $version := "9.0" }}
```

A simple example could be:
```yaml
{{ $version := "9.0" }}
- name: tomcat:{{$version}}
  image: tomcat:{{$version}}
```

And now, using if statements:
```yaml
{{ $version := "" }}
{{ if eq .Values.environment "development" }}
  image: tomcat:9.0
{{ else if eq .Values.environment "production" }}
  image: tomcat:10.0
{{ end }}
```
