function setBlockchainNetworks() {
    const selectedCrypto = localStorage.getItem('selectedCrypto');
    const blockchainNetworkSelect = document.getElementById('blockchainNetwork');

    blockchainNetworkSelect.innerHTML = '';

    if (selectedCrypto === 'bitcoin') {
        const networks = ['Lightning', 'OnChain', 'Liquid'];
        networks.forEach(network => {
            const option = document.createElement('option');
            option.value = network.toLowerCase();
            option.textContent = network;
            blockchainNetworkSelect.appendChild(option);
        });
    } else if (selectedCrypto === 'usdt') {
        const networks = ['TRC20', 'BNB', 'Polygon', 'ERC20', 'Solana'];
        networks.forEach(network => {
            const option = document.createElement('option');
            option.value = network.toLowerCase();
            option.textContent = network;
            blockchainNetworkSelect.appendChild(option);
        });
    }

    document.getElementById('cryptoChoice').textContent = selectedCrypto.toUpperCase();
    document.getElementById('fiatAmount').textContent = localStorage.getItem('fiatAmount');
    document.getElementById('cryptoAmount').textContent = localStorage.getItem('cryptoAmount');
}

function confirmPurchase() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const blockchainNetwork = document.getElementById('blockchainNetwork').value;

    if (!paymentMethod || !blockchainNetwork) {
        alert('Por favor, selecione a forma de pagamento e a rede blockchain.');
        return;
    }

    const uniqueId = 'ID-' + new Date().toISOString().replace(/[-:T.]/g, '') + Math.floor(Math.random() * 1000);

    const cryptoChoice = localStorage.getItem('selectedCrypto');
    const fiatAmount = localStorage.getItem('fiatAmount');
    const cryptoAmount = localStorage.getItem('cryptoAmount');

    const textToCopy = `Compra ID: ${uniqueId}\nCriptomoeda: ${cryptoChoice}\nValor em Reais: R$${fiatAmount}\nQuantidade de Criptomoeda: ${cryptoAmount}\nForma de Pagamento: ${paymentMethod}\nRede Blockchain: ${blockchainNetwork}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Compra confirmada! As informações foram copiadas para a área de transferência.');
    }).catch(err => {
        console.error('Erro ao copiar para a área de transferência:', err);
    });
}

window.onload = setBlockchainNetworks;
