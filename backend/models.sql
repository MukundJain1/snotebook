CREATE TABLE userinfo (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password  VARCHAR(20) NOT NULL,
);

ALTER TABLE userinfo ADD constraint email UNIQUE(email);
-- ALTER TABLE <Table_name> ADD CONSTRAINT <constraint_name> UNIQUE(<column_name>);

ALTER TABLE userinfo ALTER COLUMN password SET NOT NULL;
-- ALTER TABLE <Table_name> ALTER COLUMN <column_name> SET NOT NULL

ALTER TABLE userinfo ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE <Table_name> ADD COLUMN <column_name> <data_type> DEFAULT <default_value>;

ALTER TABLE userinfo ALTER COLUMN username TYPE TEXT;
-- ALTER TABLE <Table_name> ALTER COLUMN <column_name> TYPE <new_data_type>;
ALTER TABLE userinfo DROP COLUMN email;
-- ALTER TABLE <Table_name> DROP COLUMN <column_name>;

DELETE FROM userinfo WHERE id = 1;

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES userinfo(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);