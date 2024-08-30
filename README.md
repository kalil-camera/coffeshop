# Projeto Integrador Transdisciplinar 2 - Aplicativo de Cafeteria

## Descrição do Projeto

Este projeto foi desenvolvido por Kalil El Ammar Camera e é parte da disciplina de **Projeto Integrador Transdisciplinar 2** e consiste no desenvolvimento de uma API REST para uma cafeteria fictícia. O objetivo principal é fornecer um backend eficiente, escalável e bem estruturado utilizando o framework **NestJS** e o banco de dados **PostgreSQL**.

### Funcionalidades Principais

O sistema permite:

- **Gerenciamento de clientes:** Registro, autenticação, e manutenção de informações pessoais.
- **Gerenciamento de produtos:** Exibição de cardápio, com categorias, descrições e preços dos produtos.
- **Criação e acompanhamento de pedidos:** Os clientes podem realizar pedidos, personalizá-los, escolher métodos de pagamento e acompanhar o status.
- **Sistema de pagamentos:** Integração para processar diferentes métodos de pagamento.
- **Sistema de avaliações:** Os clientes podem avaliar pedidos concluídos, fornecendo feedback.
- **Notificações:** O sistema envia notificações para os clientes sobre o status dos pedidos.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir a API REST do back-end.
- **VueJS**: Framework Node.js para construir o front-end.
- **TypeORM**: ORM para facilitar a integração com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados da aplicação.
- **Node.js**: Ambiente de execução para o JavaScript server-side.
- **TypeScript**: Linguagem de programação usada no desenvolvimento do backend e frontend.


### Pré-requisitos

- **Node.js**: Versão 14.x ou superior
- **NestJS CLI**: Para gerar e executar o backend NestJS
- **VueJS CLI**: Para gerar e executar o frontend VueJS
- **PostgreSQL**: Para o banco de dados

### Instalação

1. Clone o repositório.

2. Entre na pasta do projeto instalar as dependencias (tanto backend quanto frontend):
   ```bash
   npm install

3. [Backend] Configure a conexão com o banco de dados PostgreSQL em src/app.module.ts.
   [Frontend] Caso não seja localhost, configure o IP do backend em frontend/.env.
      
4. Suba a API, tanto na pasta do backend quanto frontend, rodar o comando:
   ```bash
   npm run start

