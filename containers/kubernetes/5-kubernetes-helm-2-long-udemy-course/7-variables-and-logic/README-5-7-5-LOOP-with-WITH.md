## Loop

`WITH` is used to iterate over a list of values. It defines a new scope for the variables.

**Template:**
```yaml
data:
  departamentos: |-
    {{- range .Values.departamentos }}
    - {{ . }}
    {{- end }}
```

**Values:**
```yaml
departamentos:
  rrhh: California
  sales: New York
  TI: Texas
  Marketing: Florida
```

Output:

```
data:
  departamentos:
    - rrhh
    - sales
    - TI
    - Marketing
```
