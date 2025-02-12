## 🚀 Releases and charts commands

### 🏚️ Releases commands, get information
```sh
# Command
helm get [all/hooks/manifest/notes/values] <release>

# Available Commands:
#   all         download all information for a named release
#   hooks       download all hooks for a named release
#   manifest    download the manifest for a named release
#   metadata    This command fetches metadata for a given release
#   notes       download the notes for a named release
#   values      download the values file for a named release

# Example
helm get manifest apache1
helm get all redis1
```

### 📦 Charts commands, get information
```sh
# Command
helm show [all/chart/crds/readme/values] <chart>

# Available Commands:
#   all         show all information of the chart
#   chart       show the chart's definition
#   crds        show the chart's CRDs
#   readme      show the chart's README
#   values      show the chart's values

# Example
helm show chart bitnami/apache
helm show readme bitnami/apache > apache_readme.md
helm show values bitnami/apache > my_values
```
