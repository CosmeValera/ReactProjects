## Partials

Partial files have the extension `.tpl` and are located in the `templates` folder.

They are used to avoid repeating the same code in multiple files.

These files are not rendered as a resource, but they can be used in other templates.

### How to use partials:
**define**: Defines a partial.

**include**: Includes a partial.

> [!WARNING]
> **`template`** also works to include partials, but it's deprecated.

### Partial example:
**Partial example**:
```yaml
{{- define "myPartial" -}}
  print: {{ print "Matt has " .Values.dogs " dogs" | printf "%s -added" }}
  randInt: {{ randInt 1 10 | printf "%d - random number"  }}
{{- end -}}
```

**Manifest file**:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
  namespace: default
  {{- include "myPartial" . | indent 2 }}
```

**Result**:
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: pr1-config
  namespace: default
  print: Matt has 7 dogs -added
  randInt: 2 - random number
```
