# 🐘 PostgreSQL


Here are some basic PostgreSQL commands to connect to a database and some others once you are inside.

## 📡 Connect to a database
0. Connect to a docker terminal <small>*(When using Docker)*</small>
```sh
docker exec -it aggregator_postgres /bin/bash
```

1. Enter a postgreSQL session
```sh
psql -U username  # Or
psql -U username -d database_name
```

2. Show All databases
```sh
\l
```

3. Connect to a database
```sh
\c database_name
```


## 🗄️ Inside a database

1. Show ALL tables
```sh
\dt
```
2. Create a Table

```sql
CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  tweet_content VARCHAR(256)
);
```

**id:** A column with a serial type to automatically increment. |
**name:** A column with a maximum length of 100 characters.

3. Drop a Table

```sql
DROP TABLE table_name;
```
4. Select All Rows from a Table (more in `seed.sql`)

```sql
SELECT * FROM table_name;
```
<small>**Sub-select** and **join** queries in `seed.sql`.</small>

1. Show Table Structure

```sql
\d table_name
```
6. Insert Data into a Table

```sql
INSERT INTO tweets 
  (tweet_content) VALUES
  ('SCC 2024 had Magnus Carlsen as the winner'),
  ('Alireza was second');
```
7. Update Data in a Table

```sql
UPDATE tweets
SET tweet_content = 'Hikaru was third' 
WHERE id = 4;
```
8. Delete Data from a Table

```sql
DELETE FROM tweets
WHERE id = 4;
```
9. Exit the PostgreSQL Prompt

```sh
\q
```

## 🔧 Additional commands

1. List All Schemas
```sh
\dn
```
In PostgreSQL, a **schema** is like a "database" in other DBMS, and a **database** is a container for multiple schemas. By default, it uses the `public` schema.

2. List All Users
```sh
\du
```

3. View Current Database Connection Info
```sh
\conninfo
```

4. List All Indexes
```sh
\di
```

5. Set the pager off
```sh
\pset pager off  # off | on | always
```