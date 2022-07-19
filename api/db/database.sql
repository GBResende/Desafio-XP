DROP DATABASE IF EXISTS stocks_xp;

CREATE DATABASE IF NOT EXISTS stocks_xp;

CREATE TABLE stocks_xp.stocks (
  id INT NOT NULL AUTO_INCREMENT,
  ticker VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  value DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE stocks_xp.users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE stocks_xp.user_ops (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL,
    operation BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE stocks_xp.user_ops ADD FOREIGN KEY (user_id) REFERENCES stocks_xp.users(id);
ALTER TABLE stocks_xp.user_ops ADD FOREIGN KEY (stock_id) REFERENCES stocks_xp.stocks(id);

CREATE TABLE stocks_xp.wallet (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE stocks_xp.wallet ADD FOREIGN KEY (user_id) REFERENCES stocks_xp.users(id);
ALTER TABLE stocks_xp.wallet ADD FOREIGN KEY (stock_id) REFERENCES stocks_xp.stocks(id);



INSERT INTO stocks_xp.users (username, email, password, balance) 
VALUES 
('gabDev', 'gabresendemkt@gmail.com', 'passaportexp', '4000.00'),
('leonard', 'leo@gmail.com', 'passaportexp', '4000.00');

INSERT INTO stocks_xp.stocks (ticker, quantity, value)
VALUES ('AAPL', '500', '150.00'),
('PETR4', '500', '150.00'),
('XPTR', '500', '150.00'),
('MAGL4', '500', '150.00');
