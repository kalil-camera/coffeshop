CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    endereco VARCHAR(200)
);

CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagemlink VARCHAR(50)
);

CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status_pedido VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    avaliacao VARCHAR(10)

);

CREATE TABLE item_pedido (
    id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

