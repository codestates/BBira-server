CREATE TABLE users (
  id INT AUTO_INCREMENT,
  nickname varchar(255) DEFAULT '' NOT NULL,
  email varchar(255) DEFAULT '' NOT NULL,
  password varchar(255) DEFAULT '' NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  store_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE stores (
  id INT AUTO_INCREMENT,
  phone varchar(255) DEFAULT '' NOT NULL,
  storename varchar(255) DEFAULT '' NOT NULL,
  address varchar(255) DEFAULT '' NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE items (
  id INT AUTO_INCREMENT,
  itemname varchar(255) DEFAULT '' NOT NULL,
  itemphoto varchar(255) DEFAULT '' NOT NULL,
  itemdesc varchar(255) DEFAULT '' NOT NULL,
  itemprice varchar(255) DEFAULT '' NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  store_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT,
    tagname varchar(255) DEFAULT '' NOT NULL,
    createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE tag_stores (
    tag_id INT,
    store_id INT
);


ALTER TABLE users ADD FOREIGN KEY (store_id) REFERENCES stores (id);
ALTER TABLE items ADD FOREIGN KEY (store_id) REFERENCES stores (id);
ALTER TABLE tag_stores ADD FOREIGN KEY (store_id) REFERENCES stores (id);
ALTER TABLE tag_stores ADD FOREIGN KEY (tag_id) REFERENCES tags (id);


ALTER TABLE stores CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE stores CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO users (email, nickname, password) VALUES ("BBira@gmail.com", "BBira", "1234");
INSERT INTO stores (phone, storename, address) VALUES ("010-1234-5678", "shop", "강북");
-- INSERT INTO tags (tagname) VALUES ()
-- INSERT INTO items (itemname, itemphoto, itemdesc, itemprice) VALUES ()


