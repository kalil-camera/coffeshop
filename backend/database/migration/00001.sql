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

create TABLE metodo_pagamento (
    id SERIAL PRIMARY KEY,
    metodo VARCHAR(10)
);

create TABLE pagamento (
    id SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_metodo_pagamento INT NOT NULL,
    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (id_metodo_pagamento) REFERENCES metodo_pagamento(id) ON DELETE CASCADE
);

create TABLE notificacoes (
    id SERIAL PRIMARY KEY,
    notificacao VARCHAR(10));