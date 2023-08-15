class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let totalValue = 0;
        const orderedItems = new Set();
        let mainItemOrdered = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio.hasOwnProperty(codigo)) {
                return "Item inválido!";
            }

            if (quantidade !== undefined && parseInt(quantidade) === 0) {
                return "Quantidade inválida!";
            }

            if (this.isExtra(codigo)) {
                const principal = this.principalItem(codigo);
                if (principal && !orderedItems.has(principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else {
                orderedItems.add(codigo);
                mainItemOrdered = true;
            }

            const valorItem = this.cardapio[codigo].valor * (parseInt(quantidade) || 1);
            totalValue += valorItem;
        }
        
        if (metodoDePagamento === "dinheiro") {
            totalValue *= 0.95;
        } else if (metodoDePagamento === "credito") {
            totalValue *= 1.03;
        } else if (metodoDePagamento !== "debito") {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${totalValue.toFixed(2).replace(".", ",")}`;
    }

    isExtra(codigo) {
        return codigo === 'chantily' || codigo === 'queijo';
    }

    principalItem(codigoExtra) {
        if(codigoExtra === 'queijo'){
            return 'sanduiche';
        }else if(codigoExtra === 'chantily'){
            return 'cafe';
        }
        return null;
    }
}

export { CaixaDaLanchonete };