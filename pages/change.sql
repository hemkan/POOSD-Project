
DROP TABLE Contact; -- the table name

CREATE TABLE Contact (  
        contact_id INTEGER AUTO_INCREMENT,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(30),
        date DATE,
        access_id INTEGER NOT NULL,
        PRIMARY KEY(contact_id),
        FOREIGN KEY(access_id) REFERENCES Users(user_id) -- need to verify this line
);
