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
    total DECIMAL(10, 2) NOT NULL
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

CREATE TABLE metodo_pagamento (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    detalhes TEXT
);

CREATE TABLE pagamento (
    id SERIAL PRIMARY KEY,
    valor DECIMAL(10, 2) NOT NULL,
    status_pgto VARCHAR(50) NOT NULL,
    id_pedido INT NOT NULL,
    id_metodo INT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (id_metodo) REFERENCES metodo_pagamento(id)
);

CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL
);

CREATE TABLE avaliacao (
    id SERIAL PRIMARY KEY,
    nota INT NOT NULL,
    comentario TEXT,
    id_cliente INT NOT NULL,
    id_pedido INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id) ON DELETE CASCADE
);

CREATE TABLE notificacao (
    id SERIAL PRIMARY KEY,
    msg TEXT NOT NULL,
    Data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_cliente INT NOT NULL,
    Id_pedido INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
    FOREIGN KEY (Id_pedido) REFERENCES Pedido(id) ON DELETE CASCADE
);
