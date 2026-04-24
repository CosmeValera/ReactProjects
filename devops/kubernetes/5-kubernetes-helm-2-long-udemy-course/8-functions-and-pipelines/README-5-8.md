# Functions

## 🔍 Documentation
HELM functions and pipelines: [Click here](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/).

HELM functions list: [Click here](https://helm.sh/docs/chart_template_guide/function_list/).


## 🛫 Functions
### Functions explained:
> [!IMPORTANT]
> The functions are a way to manipulate the data.

### Functions example:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name}}-config
  namespace: default
data:
  quote: {{ quote .Values.city }}
  upper: {{ upper .Values.city }}
  now: {{ now }}
  substr: {{ substr 0 3 .Values.city }}
  sum: {{ add 1 2 3 }}
  print: {{ print "Matt has " .Values.dogs " dogs" }}
  randInt: {{ randInt 1 10 }}
```
### Functions explained:

**quote**: Returns a random quote from a list of quotes.

**upper**: Returns the uppercase version of the given string.

**now**: Returns the current date and time.

**substr**: Returns a substring of the given string.

**getHostByName**: Returns the IP address of the given host name.

**add**: Returns the sum of the given numbers.

**print**: Returns the given string.

**randInt**: Returns a random integer between the given numbers.

*And many more...*


## 🪈 Pipelines
### Pipelines explained:
> [!IMPORTANT]
> The pipelines are a way to chain functions together.
> The result of the previous function is used as the input of the next function.

### Pipelines example:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name}}-config
  namespace: default
data:
  quote: {{ quote .Values.city | upper }}
  upper: {{ upper .Values.city | repeat 3 }}
  now: {{ now |  htmlDate }}
  substr: {{ substr 0 3 .Values.city | repeat 3 }}
  sum: {{ sub (add 1 2 3) 1 }}
  print: {{ print "Matt has " .Values.dogs " dogs" | printf "%s -added" }}
  randInt: {{ randInt 1 10 | printf "%d - random number"  }}
```

### Pipelines result:
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: pr1-config
  namespace: default
data:
  quote: "CALIFORNIA"
  upper: CALIFORNIACALIFORNIACALIFORNIA
  now: 2025-02-21
  substr: CalCalCal
  sum: 5
  print: Matt has 7 dogs -added
  randInt: 2 - random number
```










