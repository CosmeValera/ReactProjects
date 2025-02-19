IF STRUCTURE
============
{{ if CONDITION }}
  # PROCESS
{{ else if CONDITION }}
  # DO ANOTHER THING
{{ else }}
  # DEFAULT OPTION
{{ end }}


OPERATORS  (CONTROL FLOW FUNCTIONS)
=========
eq  ne  lt  gt  ge  le  and  or  not
default   empty   failed ...


EXAMPLES
========
{{ if eq .Values.favorite.drink "coffee" }}  mug: true  {{ end }}

{{ if eq .Values.favorite.drink "coffee" }}
  mug: true
  {{ end }}

  {{ if eq .Values.favorite.drink "coffee" }}
  mug: true
  {{ end }}
