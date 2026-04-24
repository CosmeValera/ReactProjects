# AND and OR
## AND
```yaml
      - name: apache
      {{- if and  (eq .Values.entorno  "desarrollo") ( eq .Values.departamento "RRHH" )  }}
        image: httpd:2.4
      {{ else}}
        image: httpd:2.2
      {{ end }}
```

## OR
```yaml
      - name: apache
      {{- if or (eq .Values.tiposervicio "n") (eq .Values.tiposervicio "c") }}
        image: httpd:2.4
      {{ else}}
        image: httpd:2.2
      {{ end }}
```