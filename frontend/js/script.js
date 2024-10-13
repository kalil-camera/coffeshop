//NOTIFICAÇÕES
function mostrarNotificacao(mensagem) {
  const notificacao = document.getElementById("notificacao");
  notificacao.textContent = mensagem;
  notificacao.style.display = "block";
  notificacao.style.opacity = "1";

  setTimeout(() => {
    notificacao.style.opacity = "0";
    setTimeout(() => {
      notificacao.style.display = "none";
    }, 50);
  }, 3000);
}

//PRODUTOS
async function carregarProdutos() {
  try {
    const response = await fetch("http://127.0.0.1:3000/produtos");
    if (!response.ok) {
      throw new Error("Erro ao carregar produtos.");
    }

    const produtos = await response.json();
    const container = document.getElementById("produtos-container");

    if (!container) return;

    container.innerHTML = "";
    produtos.forEach((produto) => {
      const preco = parseFloat(produto.preco);
      if (isNaN(preco)) return;

      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto");
      produtoDiv.innerHTML = `
        <img src="image/${produto.imagemlink}.jpg" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>R$ ${preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho('${produto.nome}', ${preco}, '${
        produto.imagemlink
      }', ${produto.id})">Adicionar ao Carrinho</button>
      `;
      container.appendChild(produtoDiv);
    });
  } catch (error) {
    console.error(error);
  }
}

async function cadastrarProduto(event) {
  event.preventDefault();

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

    const mensagem = document.getElementById("mensagem");
    if (response.ok) {
      mensagem.textContent = "Produto cadastrado com sucesso!";
      mensagem.style.display = "block";
      document.getElementById("formCadastro").reset();
    } else {
      mensagem.textContent = "Erro ao cadastrar!";
      mensagem.style.display = "block";
    }
  } catch (error) {
    console.error(error);
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Erro ao cadastrar produto. Tente novamente.";
    mensagem.style.display = "block";
  }
}

function listarProdutos() {
  fetch("http://127.0.0.1:3000/produtos")
    .then((response) => response.json())
    .then((produtos) => {
      const tabela = document.getElementById("tabelaProdutos");
      const tbody = document.getElementById("produtosBody");
      tbody.innerHTML = "";

      produtos.forEach((produto) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.preco}</td>
                    <td><button onclick="removerProduto(${produto.id})">Remover</button></td>
                `;
        tbody.appendChild(tr);
      });

      tabela.style.display = "table";
    })
    .catch((error) => console.error("Erro ao listar produtos:", error));
}

function buscarProduto(event) {
  event.preventDefault();
  const id = document.getElementById("idProdutoBuscar").value;

  fetch(`${"http://127.0.0.1:3000/produtos"}/${id}`)
    .then((response) => response.json())
    .then((produto) => {
      const produtoEncontrado = document.getElementById("produtoEncontrado");
      produtoEncontrado.style.display = "block";
      produtoEncontrado.textContent = `Produto: ${produto.nome}, Preço: ${produto.preco}, Imagem: ${produto.imagemlink}`;
    })
    .catch((error) => console.error("Erro ao buscar produto:", error));
}

function atualizarProduto(event) {
  event.preventDefault();

  const id = document.getElementById("idProdutoAtualizar").value;
  const nome = document.getElementById("nomeAtualizar").value;
  const preco = document.getElementById("precoAtualizar").value;
  const imagemlink = document.getElementById("imagemAtualizar").value;

  fetch(`${"http://127.0.0.1:3000/produtos"}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, preco, imagemlink }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("mensagem").style.display = "block";
      document.getElementById("mensagem").textContent =
        "Produto atualizado com sucesso!";
      listarProdutos();
    })
    .catch((error) => console.error("Erro ao atualizar produto:", error));
}

function removerProduto(id) {
  fetch(`${"http://127.0.0.1:3000/produtos"}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      document.getElementById("mensagem").style.display = "block";
      document.getElementById("mensagem").textContent =
        "Produto removido com sucesso!";
      listarProdutos();
    })
    .catch((error) => console.error("Erro ao remover produto:", error));
}

//CARRINHO
let carrinho = [];

function adicionarAoCarrinho(produto, preco, imagem, id) {
  carrinho.push({ produto, preco, imagem, id });
  salvarCarrinho();
  mostrarNotificacao(`${produto} adicionado ao carrinho!`);
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  exibirCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  exibirCarrinho();
}

function exibirCarrinho() {
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  listaCarrinho.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<li>Carrinho vazio</li>";
  } else {
    carrinho.forEach((item, index) => {
      const imgPath = `image/${item.imagem}.jpg`;
      const li = document.createElement("li");
      li.innerHTML = `
                <img src="${imgPath}" alt="${item.produto}">
                <span>${item.produto} - R$ ${item.preco.toFixed(2)}</span>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
      listaCarrinho.appendChild(li);
      total += item.preco;
    });
  }

  totalSpan.textContent = total.toFixed(2);
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
}

// PEDIDOS
async function confirmarPedido() {
  if (carrinho.length === 0) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Não há produtos no carrinho!";
    mensagem.style.display = "block";
    return;
  }

  const pedido = {
    status_pedido: "EM PROCESSAMENTO",
    total: carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2),
    itens: carrinho.map((item) => ({
      quantidade: 1,
      subtotal: item.preco,
      produto: {
        id: item.id,
        nome: item.produto,
        preco: item.preco,
        imagemlink: item.imagem,
      },
    })),
  };

  try {
    const response = await fetch("http://127.0.0.1:3000/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    const mensagem = document.getElementById("mensagem");
    if (response.ok) {
      mensagem.textContent = "Pedido confirmado com sucesso!";
      mensagem.style.display = "block";
      limparCarrinho();
    } else {
      mensagem.textContent = "Erro ao confirmar pedido. Tente novamente.";
      mensagem.style.display = "block";
    }
  } catch (error) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Erro ao confirmar pedido. Tente novamente.";
    mensagem.style.display = "block";
  }
}

async function carregarPedidos() {
  try {
    const response = await fetch("http://127.0.0.1:3000/pedidos");
    if (!response.ok) throw new Error("Erro ao carregar pedidos.");

    const pedidos = await response.json();
    const listaPedidos = document.getElementById("lista-pedidos");

    listaPedidos.innerHTML = "";
    if (pedidos.length === 0) {
      listaPedidos.innerHTML = "<li>Nenhum pedido encontrado.</li>";
    } else {
      pedidos.forEach((pedido) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div>
            <h3>Nº do Pedido: ${pedido.id}</h3>
            <p>Status: ${pedido.status_pedido}</p>
            <p>Data: ${new Date(pedido.data_pedido).toLocaleString()}</p>
            <p>Total: R$ ${pedido.total}</p>
            <h4>Avaliação: <span class="total-pedido"></span></h4>
            <button onclick="carregarItensPedido(${
              pedido.id
            }, this)">Ver Itens</button>
          </div>
          <div class="detalhes-itens" id="itens-pedido-${
            pedido.id
          }" style="display:none;">
            <ul class="lista-itens-pedido"></ul>
          </div>
          <hr>
        `;
        listaPedidos.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    const listaPedidos = document.getElementById("lista-pedidos");
    listaPedidos.innerHTML =
      "<li>Erro ao carregar pedidos. Tente novamente.</li>";
  }
}

async function carregarItensPedido(pedidoId, botao) {
  const detalhesDiv = document.getElementById(`itens-pedido-${pedidoId}`);
  const listaItens = detalhesDiv.querySelector(".lista-itens-pedido");
  const totalSpan = detalhesDiv.querySelector(".total-pedido");

  if (detalhesDiv.style.display === "block") {
    detalhesDiv.style.display = "none";
    botao.textContent = "Ver Itens";
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/pedidos/${pedidoId}`);
    if (!response.ok) throw new Error("Erro ao carregar itens do pedido.");

    const pedido = await response.json();
    listaItens.innerHTML = "";

    pedido.itens.forEach((item) => {
      const produto = item.produto;
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="image/${produto.imagemlink}.jpg" alt="${
        produto.nome
      }" style="width: 50px; height: 50px;">
        <span>${produto.nome} - R$ ${parseFloat(produto.preco).toFixed(
        2
      )}</span>
        <span>Quantidade: ${item.quantidade}</span>
      `;
      listaItens.appendChild(li);
    });

    detalhesDiv.style.display = "block";
    botao.textContent = "Ocultar Itens";
  } catch (error) {
    console.error("Erro ao carregar itens do pedido:", error);
  }
}

function fecharDetalhes() {
  document.getElementById("detalhes-pedido").style.display = "none";
}

if (window.location.pathname.includes("carrinho.html")) {
  carregarCarrinho();
  exibirCarrinho();
}

window.onload = carregarProdutos;
