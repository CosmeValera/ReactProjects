# POSTGRESQL


Here are some basic PostgreSQL commands that you can use once you are inside a database:

1. Enter a SQL session:
```sh
psql -U username -d database_name
```

2. Show All Tables

```sh
\dt
```
3. Create a Table

```sql
CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  tweet_content VARCHAR(256)
);
```

**id:** A column with a serial type to automatically increment. |
**name:** A column with a maximum length of 100 characters.

4. Delete (Drop) a Table

```sql
DROP TABLE table_name;
```
5. Select All Rows from a Table

```sql
SELECT * FROM table_name;
```
6. Show Table Structure

```sql
\d table_name
```
7. Insert Data into a Table

```sql
INSERT INTO tweets 
  (tweet_content) VALUES
  ('SCC 2024 had Magnus Carlsen as the winner'),
  ('Alireza was second');
```
8. Update Data in a Table

```sql
UPDATE tweets
SET tweet_content = 'Hikaru was third' 
WHERE id = 4;
```
9. Delete Data from a Table

```sql
DELETE FROM tweets
WHERE id = 4;
```
10. Exit the PostgreSQL Prompt

```sh
\q
```