DROP DATABASE IF EXISTS stocks-xp;

CREATE DATABASE IF NOT EXISTS stocks-xp;

CREATE TABLE stocks-xp.stocks (
  id INT NOT NULL AUTO_INCREMENT,
  ticker VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  value DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE stocks-xp.users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE stocks-xp.user-ops (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL,
    operation BOOLEAN NOT NULL,
    PRIMARY KEY (id)
)

INSERT INTO stocks-xp.users (username, email, password, balance) 
VALUES ('gabDev', 'gabresendemkt@gmail.com', 'passaportexp', '4000.00');

INSERT INTO stocks-xp.stocks (ticker, quantity, value)
VALUES ('AAPL', '500', '150.00'),
VALUES ('PETR4', '500', '150.00'),
VALUES ('XPTR', '500', '150.00'),
VALUES ('MAGL4', '500', '150.00'),
