## Loop
### WITH

`WITH` is used to iterate over a list of values. It defines a new scope for the variables.

**Template:**
```yaml
data:
{{- with .Values.departamentos}}
  {{- range . }}
    ciudad: {{ . }}
  {{- end }}
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
  ciudad: California
  ciudad: New York
  ciudad: Texas
  ciudad: Florida
```

Here, the `departamentos` key is a list of strings. The `range` directive iterates over each element in the list, and the current element is assigned to the variable `.`.

You can also extract the key and value of the map.

**Template:**
```yaml
data:
{{- with .Values.departamentos}}
  {{- range $key, $value := . }}
    $key: $value
  {{- end }}
{{- end }}
```

Output:

```
data:
  rrhh: California
  sales: New York
  TI: Texas
  Marketing: Florida
```

### Range
Use `range` for maps, or lists without keys:

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


## Best practices

- Use `range $key, $value` when working with maps to avoid ambiguity.

- Use `range .` for lists (where keys are irrelevant).

- Always declare the structure clearly in your `values.yaml` (e.g., use a list if you don't need keys).