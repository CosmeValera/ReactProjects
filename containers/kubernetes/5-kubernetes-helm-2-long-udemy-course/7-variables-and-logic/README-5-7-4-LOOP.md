## Loop

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
  - rrhh
  - sales
  - TI
  - Marketing
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

Here, the `departamentos` key is a list of strings. The `range` directive iterates over each element in the list, and the current element is assigned to the variable `.`.

This, `|-` ensures your dynamically generated list is formatted as a valid YAML multi-line block, preserving structure and indentation. And the `-` is used to remove the leading and trailing whitespace from the string.

# Loop with index
```yaml
data:
  departamentos: |-
    {{- range $indice,$valor:=.Values.departamentos }}
    - {{ $indice }}: {{$valor}}
    {{- end }}
```

Output:

```
data:
  departamentos:
    - 0: rrhh
    - 1: sales
    - 2: TI
    - 3: Marketing
```