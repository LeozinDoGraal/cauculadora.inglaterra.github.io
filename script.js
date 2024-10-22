let total = 0;
const quantities = {};

// Adiciona um item ao carrinho e atualiza o total
function addToCart(itemName, price) {
  total += price;

  // Atualiza a quantidade do item
  if (quantities[itemName]) {
    quantities[itemName].quantity++;
  } else {
    quantities[itemName] = { quantity: 1, price: price };
  }

  // Atualiza o total na tela
  document.getElementById('total').textContent = total;

  // Atualiza a exibição das quantidades
  updateQuantitiesDisplay();
}

// Remove um item do carrinho e atualiza o total
function removeFromCart(itemName) {
  if (quantities[itemName] && quantities[itemName].quantity > 0) {
    total -= quantities[itemName].price;
    quantities[itemName].quantity--;

    if (quantities[itemName].quantity === 0) {
      delete quantities[itemName]; // Remove o item se a quantidade for 0
    }

    // Atualiza o total na tela
    document.getElementById('total').textContent = total;

    // Atualiza a exibição das quantidades
    updateQuantitiesDisplay();
  }
}

// Atualiza a exibição das quantidades na tela
function updateQuantitiesDisplay() {
  const quantitiesDiv = document.getElementById('quantities');
  quantitiesDiv.innerHTML = ''; // Limpa a exibição anterior

  for (const item in quantities) {
    const itemDisplay = document.createElement('div');
    itemDisplay.textContent = `${item}: ${quantities[item].quantity}`;

    // Cria os botões de "+" e "-" para cada item
    const quantityControls = document.createElement('div');
    quantityControls.classList.add('quantity-controls');

    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.onclick = () => removeFromCart(item);

    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.onclick = () => addToCart(item, quantities[item].price);

    // Adiciona os botões de controle de quantidade
    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(plusButton);

    // Adiciona os controles ao lado da exibição da quantidade
    itemDisplay.appendChild(quantityControls);

    // Adiciona ao container de exibição
    quantitiesDiv.appendChild(itemDisplay);
  }
}

function showObservations() {
  document.getElementById('observationsModal').style.display = 'block';
}

function closeObservations() {
  document.getElementById('observationsModal').style.display = 'none';
}

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
  const modal = document.getElementById('observationsModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
