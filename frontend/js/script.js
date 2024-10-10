let carrinho = [];

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produto, preco, imagem) {
  carrinho.push({ produto, preco, imagem });
  console.log(`Adicionado ao carrinho: ${produto}`);
  salvarCarrinho(); // Salva no localStorage
  mostrarNotificacao(`${produto} adicionado ao carrinho!`); // Exibe a notificação
}

// Função para mostrar a notificação
function mostrarNotificacao(mensagem) {
  const notificacao = document.getElementById("notificacao");
  notificacao.textContent = mensagem;
  notificacao.style.display = "block"; // Torna a notificação visível
  notificacao.style.opacity = "1"; // Torna a notificação visível

  setTimeout(() => {
    notificacao.style.opacity = "0"; // Faz a notificação desaparecer
    setTimeout(() => {
      notificacao.style.display = "none"; // Esconde a notificação após a transição
    }, 50); // Tempo de espera igual ao tempo de transição
  }, 3000); // Duração que a notificação permanece visível
}

// Restante do código continua como antes...

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para carregar os itens do carrinho
function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
}
// Função para exibir os itens no carrinho
function exibirCarrinho() {
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  listaCarrinho.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<li>Carrinho vazio</li>"; // Mensagem para carrinho vazio
  } else {
    carrinho.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <img src="${item.imagem}" alt="${item.produto}">
                <span>${item.produto} - R$ ${item.preco.toFixed(2)}</span>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
      listaCarrinho.appendChild(li);
      total += item.preco;
    });
  }

  totalSpan.textContent = total.toFixed(2);
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1); // Remove o item do carrinho
  salvarCarrinho(); // Salva o carrinho atualizado
  exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para limpar o carrinho
function limparCarrinho() {
  carrinho = []; // Limpa o array do carrinho
  salvarCarrinho(); // Salva a mudança no localStorage
  exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Carregar o carrinho ao entrar na página do carrinho
if (window.location.pathname.includes("carrinho.html")) {
  carregarCarrinho();
  exibirCarrinho(); // Chame a função de exibição após carregar o carrinho
}

// Função para cadastrar um produto
async function cadastrarProduto(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const imagemlink = document.getElementById("imagemlink").value;

  const produto = {
    nome: nome,
    preco: parseFloat(preco),
    imagemlink: imagemlink,
  };

  try {
    const response = await fetch("http://127.0.0.1:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (response.ok) {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "Produto cadastrado com sucesso!";
      mensagem.style.display = "block";
      document.getElementById("formCadastro").reset(); // Limpa o formulário
    } else {
      throw new Error("Erro ao cadastrar produto.");
    }
  } catch (error) {
    console.error(error);
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Erro ao cadastrar produto. Tente novamente.";
    mensagem.style.display = "block";
  }
}

async function carregarProdutos() {
  try {
    const response = await fetch("http://127.0.0.1:3000/produtos");
    if (!response.ok) {
      throw new Error("Erro ao carregar produtos.");
    }

    const produtos = await response.json();
    const container = document.getElementById("produtos-container");

    // Verifica se o container existe
    if (!container) {
      return; // Sai da função se o elemento não existir
    }

    container.innerHTML = ""; // Limpa o container antes de adicionar novos produtos

    //converte o preço para exibição no front
    produtos.forEach((produto) => {
      const preco = parseFloat(produto.preco);
      if (isNaN(preco)) {
        return;
      }

      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto");
      produtoDiv.innerHTML = `
        <img src="image/${produto.imagemlink}.jpg" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>R$ ${preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho('${produto.nome}', ${preco}, '${
        produto.imagemlink
      }')">Adicionar ao Carrinho</button>
      `;
      container.appendChild(produtoDiv);
    });
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar produtos. Tente novamente mais tarde.");
  }
}




// Carrega os produtos ao iniciar a página
window.onload = carregarProdutos;

// Função para abrir e fechar o menu dropdown
function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden"); // Alterna a classe 'hidden'
}
