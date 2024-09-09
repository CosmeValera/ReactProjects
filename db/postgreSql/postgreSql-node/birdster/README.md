# POSTGRESQL


Here are some basic PostgreSQL commands that you can use once you are inside a database:

1. Show All Tables

```sql
\dt
```
2. Create a Table

```sql
CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  tweet_content VARCHAR(256)
);
```
**id:** A column with a serial type to automatically increment.
**name:** A column with a maximum length of 100 characters.

3. Delete (Drop) a Table

```sql
DROP TABLE table_name;
```
4. Select All Rows from a Table

```sql
SELECT * FROM table_name;
```
5. Show Table Structure

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
1. Update Data in a Table

```sql
UPDATE example_table SET name = 'Jane Doe' WHERE id = 1;
```
8. Delete Data from a Table

```sql
DELETE FROM example_table WHERE id = 1;
```
9. Exit the PostgreSQL Prompt

```sql
\q
```