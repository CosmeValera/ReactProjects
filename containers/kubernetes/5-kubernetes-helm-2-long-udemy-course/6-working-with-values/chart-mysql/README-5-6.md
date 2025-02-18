> FROM notes.txt

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