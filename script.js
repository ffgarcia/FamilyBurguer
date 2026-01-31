function montarPedido() {
  var nome = document.getElementById("nome").value.trim();
  var telefoneRaw = document.getElementById("telefone").value.trim().replace(/\D/g, "");
  var ingredientes = document.querySelectorAll('input[name="ingredientes"]:checked');
  var pontoCarne = document.querySelector('input[name="pontoCarne"]:checked');
  var extras = document.querySelectorAll('input[name="extras"]:checked');
  var bebida = document.querySelector('input[name="bebida"]:checked');
  var obs = document.getElementById("obs").value.trim();
  var whatsappNumber = "5513996702044"; // (13) 996702044

  if (!nome) {
    alert("Por favor, digite seu nome.");
    return;
  }

  if (telefoneRaw.length < 10) {
    alert("Por favor, digite seu número de WhatsApp (com DDD) para receber a resposta quando o pedido estiver pronto.");
    return;
  }

  var telefoneCompleto = telefoneRaw.length >= 12 && telefoneRaw.substring(0, 2) === "55"
    ? telefoneRaw
    : "55" + telefoneRaw;
  var linkPronto = "https://wa.me/" + telefoneCompleto + "?text=" + encodeURIComponent("Seu pedido está pronto! 🍔");

  if (ingredientes.length === 0) {
    alert("Marque pelo menos um ingrediente no hambúrguer (pão, carne, salada ou queijo).");
    return;
  }

  var linhas = [];
  linhas.push("🍔 *PEDIDO - NOITE DO HAMBÚRGUER*");
  linhas.push("");
  linhas.push("👤 *Nome:* " + nome);
  linhas.push("");
  var burgerItens = [];
  ingredientes.forEach(function (el) {
    burgerItens.push(el.value);
  });
  linhas.push("🍔 *Hambúrguer:* " + burgerItens.join(", "));
  linhas.push("🥩 *Ponto da carne:* " + (pontoCarne ? pontoCarne.value : "—"));
  linhas.push("");

  var extrasList = [];
  extras.forEach(function (el) {
    extrasList.push(el.value);
  });
  if (extrasList.length > 0) {
    linhas.push("➕ *Extras:* " + extrasList.join(", "));
    linhas.push("");
  }

  linhas.push("🥤 *Bebida:* " + (bebida ? bebida.value : "—"));
  linhas.push("");

  if (obs) {
    linhas.push("📝 *Obs:* " + obs);
    linhas.push("");
  }

  linhas.push("_Pedido montado pelo app Noite do Hambúrguer_");
  linhas.push("");
  linhas.push("📱 *Número para retorno:* " + telefoneCompleto);
  linhas.push("✅ _Responder que está pronto (clique no link):_");
  linhas.push(linkPronto);

  var mensagem = linhas.join("\n");
  var mensagemEncoded = encodeURIComponent(mensagem);

  var urlWhatsApp = "https://wa.me/" + whatsappNumber + "?text=" + mensagemEncoded;

  /* Resumo na tela: sem número e sem link (só na mensagem do WhatsApp) */
  var resumo = [];
  resumo.push("🍔 PEDIDO - NOITE DO HAMBÚRGUER");
  resumo.push("");
  resumo.push("👤 Nome: " + nome);
  resumo.push("🍔 Hambúrguer: " + burgerItens.join(", "));
  resumo.push("🥩 Ponto da carne: " + (pontoCarne ? pontoCarne.value : "—"));
  if (extrasList.length > 0) resumo.push("➕ Extras: " + extrasList.join(", "));
  resumo.push("🥤 Bebida: " + (bebida ? bebida.value : "—"));
  if (obs) resumo.push("📝 Obs: " + obs);

  document.getElementById("resumoPedido").textContent = resumo.join("\n");
  document.getElementById("btnWhatsApp").href = urlWhatsApp;
  document.getElementById("orderScreen").style.display = "none";
  document.getElementById("successScreen").style.display = "block";
}

function voltarPedido() {
  document.getElementById("successScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "block";
}
