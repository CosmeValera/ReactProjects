# Order of values
1. `values.yaml`
2. `values.yaml` passed tot the chart with `install` or `upgrade` with the `-f` flag (or `--values`, it's the same)
3. Parametres pased with `--set`

Regarding this, let's see 2 examples:

### Change values using a `values.yaml` file
```bash
helm upgrade mysql1 chart-composite-values/ -f chart-composite-values/values1.yaml

helm get manifest mysql1
```

### Change values using a --set flag
```bash
helm upgrade mysql1 chart-composite-values/ --set limites.memoria=200Mi

helm get manifest mysql1
```


## CHART-MYSQL example
> FROM chart-mysql/notes.txt

You installed a mysql database.

Your database is called "kubernetes" and your username is "usudb" with the password "ipass".

To connect to your database, run the following command:
```bash
kubectl exec -it <pod-name> -- bash
```
Once inside the pod, run the following command to connect to the database:
```bash
mysql -u root -p
```
Enter the password `rpas` when prompted.

Show databases:
```bash
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| kubernetes         |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

Happy Helming!