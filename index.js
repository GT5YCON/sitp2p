let btcPrice = 0;
let usdtPrice = 0;

// Função para buscar as cotações da CoinGecko
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=brl');
        const data = await response.json();

        btcPrice = data.bitcoin.brl;
        usdtPrice = data.tether.brl;

        document.getElementById('btcPrice').textContent = btcPrice.toFixed(2);
        document.getElementById('usdtPrice').textContent = usdtPrice.toFixed(2);

        calculateCryptoAmount(); // Atualiza a quantidade de criptomoeda após carregar os preços
    } catch (error) {
        console.error("Erro ao buscar cotações:", error);
    }
}

// Função para calcular a quantidade de criptomoeda com base no valor em reais
function calculateCryptoAmount() {
    const fiatAmount = parseFloat(document.getElementById('fiatAmount').value);
    const cryptoType = document.getElementById('cryptoType').value;
    let cryptoAmount = 0;

    if (fiatAmount > 0) {
        if (cryptoType === 'bitcoin' && btcPrice > 0) {
            cryptoAmount = fiatAmount / btcPrice;
        } else if (cryptoType === 'usdt' && usdtPrice > 0) {
            cryptoAmount = fiatAmount / usdtPrice;
        }

        localStorage.setItem('fiatAmount', fiatAmount);
        localStorage.setItem('cryptoAmount', cryptoAmount.toFixed(8));
        localStorage.setItem('selectedCrypto', cryptoType);

        document.getElementById('cryptoAmount').value = cryptoAmount.toFixed(8);
    } else {
        document.getElementById('cryptoAmount').value = '';
    }
}

// Função que redireciona para a página de pagamento
function goToPaymentPage() {
    window.location.href = 'pagamento.html'; // Página de pagamento
}

// Carrega as cotações ao abrir a página
window.onload = fetchCryptoPrices;
