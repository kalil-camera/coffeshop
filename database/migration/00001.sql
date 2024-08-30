-- Criando a tabela Cliente
CREATE TABLE Cliente (
    ID_Cliente SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(100) NOT NULL,
    Endereco VARCHAR(200)
);

-- Criando a tabela Produto
CREATE TABLE Produto (
    ID_Produto SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Preco DECIMAL(10, 2) NOT NULL,
    Categoria VARCHAR(50)
);

-- Criando a tabela Pedido
CREATE TABLE Pedido (
    ID_Pedido SERIAL PRIMARY KEY,
    Data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    ID_Cliente INT NOT NULL,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente)
);

-- Criando a tabela ItemPedido
CREATE TABLE ItemPedido (
    ID_Item SERIAL PRIMARY KEY,
    Quantidade INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    ID_Pedido INT NOT NULL,
    ID_Produto INT NOT NULL,
    FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido) ON DELETE CASCADE,
    FOREIGN KEY (ID_Produto) REFERENCES Produto(ID_Produto)
);

-- Criando a tabela MetodoPagamento
CREATE TABLE MetodoPagamento (
    ID_Metodo SERIAL PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL,
    Detalhes TEXT
);

-- Criando a tabela Pagamento
CREATE TABLE Pagamento (
    ID_Pagamento SERIAL PRIMARY KEY,
    Valor DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(50) NOT NULL,
    ID_Pedido INT NOT NULL,
    ID_Metodo INT NOT NULL,
    FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido) ON DELETE CASCADE,
    FOREIGN KEY (ID_Metodo) REFERENCES MetodoPagamento(ID_Metodo)
);

-- Criando a tabela Funcionario
CREATE TABLE Funcionario (
    ID_Funcionario SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Cargo VARCHAR(50) NOT NULL
);

-- Criando a tabela Avaliacao
CREATE TABLE Avaliacao (
    ID_Avaliacao SERIAL PRIMARY KEY,
    Nota INT CHECK (Nota >= 1 AND Nota <= 5),
    Comentario TEXT,
    ID_Cliente INT NOT NULL,
    ID_Pedido INT NOT NULL,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente),
    FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido) ON DELETE CASCADE
);

-- Criando a tabela Notificacao
CREATE TABLE Notificacao (
    ID_Notificacao SERIAL PRIMARY KEY,
    Mensagem TEXT NOT NULL,
    Data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ID_Cliente INT NOT NULL,
    ID_Pedido INT NOT NULL,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente),
    FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido) ON DELETE CASCADE
);
