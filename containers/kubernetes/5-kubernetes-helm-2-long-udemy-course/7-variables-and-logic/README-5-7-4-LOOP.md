## Loop

```yaml
data:
  departamentos: |-
    {{- range .Values.departamentos }}
    - {{ . }}
    {{- end }}
```

Here, the `departamentos` key is a list of strings. The `range` directive iterates over each element in the list, and the current element is assigned to the variable `.`.

This, `|-` is used to preserve the newlines in the string.
