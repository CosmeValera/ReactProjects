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
  {{- include "myPartial" . }}
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

---

> [!WARNING]
> Considerations:
> When trying to use a partial without the context, it will throw an error.

**Manifest file**:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
  namespace: default
  {{- include "myPartial" }}
```

**Error**:
``` 
Error: INSTALLATION FAILED: template: Plantilla3/templates/deploy_web.yaml:5:6: executing "Plantilla3/templates/deploy_web.yaml" at <include>: wrong number of args for include: want 2 got 1
```

So we need to pass the context to the partial.

```yaml
{{- include "myPartial" . }}
```

And the partial will be rendered with the context.

Happy Helming! 🎉