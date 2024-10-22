# Projeto Integrador Transdisciplinar 2 - Aplicativo de Cafeteria

## Descrição do Projeto

Este projeto foi desenvolvido por Kalil El Ammar Camera e é parte da disciplina de **Projeto Integrador Transdisciplinar 2** e consiste no desenvolvimento de uma API REST para uma cafeteria fictícia. O objetivo principal é fornecer um backend eficiente, escalável e bem estruturado utilizando o framework **NestJS** e o banco de dados **PostgreSQL**. O front end foi desenvolvido de forma clássica, utilizando *HTML, TypeScript e CSS*.

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
- **HTML, CSS e TypeScript**: Front-end construido de maneira mais clássica, porém com boa performance.
- **TypeORM**: ORM para facilitar a integração com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados da aplicação.
- **Node.js**: Ambiente de execução para o JavaScript server-side.
- **TypeScript**: Linguagem de programação usada no desenvolvimento do backend e frontend.


### Pré-requisitos

- **Node.js**: Versão 14.x ou superior
- **NestJS CLI**: Para gerar e executar o backend NestJS
- **PostgreSQL**: Para o banco de dados

### Instalação

1. Clone o repositório.

2. Para subir o [Back-end] local:
   Entre na pasta backend, rode o comando: npm install.
   Configure a conexão com o banco de dados PostgreSQL em backend/src/app.module.ts. 
   Em seguida, rode o comando npm start.

3. Para subir o [Front-end] local:
   Instale a extensão Live Server para o VS Code.
   Abra o index.html e inicie o servidor clicando no canto inferior direito.


4. Como acessar o projeto:

Frontend (usando o live server): http://127.0.0.1:5500 (ou a porta escolhida)
Swagger do Back-end: http://127.0.0.1:3000/api - Isso é tipo o Postman, pode fazer as requests diretamente para o back-end, manipulando o JSON.
