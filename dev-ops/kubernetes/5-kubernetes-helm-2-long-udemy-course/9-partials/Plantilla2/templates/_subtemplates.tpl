{{- define "plantilla1.etiquetas" }}
  labels: 
     responsable: Thomas
     fecha: {{ now | htmlDate }}
{{- end }}