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
