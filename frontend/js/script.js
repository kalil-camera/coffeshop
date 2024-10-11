let carrinho = [];

function adicionarAoCarrinho(produto, preco, imagem) {
  carrinho.push({ produto, preco, imagem });
  console.log(`Adicionado ao carrinho: ${produto}`);
  salvarCarrinho();
  mostrarNotificacao(`${produto} adicionado ao carrinho!`);
}

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

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
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

if (window.location.pathname.includes("carrinho.html")) {
  carregarCarrinho();
  exibirCarrinho();
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

    if (!container) {
      return;
    }

    container.innerHTML = "";

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
  }
}

// carreg a produtos no iniciaa
window.onload = carregarProdutos;

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

    if (response.ok) {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "Pedido confirmado com sucesso!";
      mensagem.style.display = "block";
      limparCarrinho();
    } else {
      const mensagem = document.getElementById("mensagem");
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
    if (!response.ok) {
      throw new Error("Erro ao carregar pedidos.");
    }

    const pedidos = await response.json();
    const listaPedidos = document.getElementById("lista-pedidos");

    //limpar lista antes de add mais
    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      listaPedidos.innerHTML = "<li>Nenhum pedido encontrado.</li>";
    } else {
      pedidos.forEach((pedido) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <div>
                        <h3>ID do Pedido: ${pedido.id}</h3>
                        <p>Status: ${pedido.status_pedido}</p>
                        <p>Data do Pedido: ${new Date(
                          pedido.data_pedido
                        ).toLocaleString()}</p>
                        <p>Total: R$ ${pedido.total}</p>
                    </div>
                    <hr>
                `;
        listaPedidos.appendChild(li);
      });
    }
  } catch (error) {
    console.error(error);
    const listaPedidos = document.getElementById("lista-pedidos");
    listaPedidos.innerHTML =
      "<li>Erro ao carregar pedidos. Tente novamente.</li>";
  }
}
