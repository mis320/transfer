const weth = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const usdt = '0x55d398326f99059ff775485246999027b3197955'
const busdt = '0xe9e7cea3dedca5984780bafc599bd69add087d56'

function getPaths(contract) {


    let ETHpathBuy = []
    ETHpathBuy.push(weth)
    ETHpathBuy.push(contract)

    let USDpathBuy = []
    USDpathBuy.push(weth)
    USDpathBuy.push(usdt)
    USDpathBuy.push(contract)


    let BUSDpathBuy = []
    BUSDpathBuy.push(weth)
    BUSDpathBuy.push(busdt)
    BUSDpathBuy.push(contract)

    let pathsBuy = []
    pathsBuy.push(ETHpathBuy)
    pathsBuy.push(USDpathBuy)






    let ETHpathSell = []
    
    ETHpathSell.push(contract)
    ETHpathSell.push(weth)

    let USDpathSell = []
    USDpathSell.push(contract)
    USDpathSell.push(usdt)
    USDpathSell.push(weth)
    


    let BUSDpathSell = []
    BUSDpathSell.push(contract)
    BUSDpathSell.push(busdt)
    BUSDpathSell.push(weth)


    let pathsSell = []



    return {"buy":pathsBuy,'sell':pathsSell}

}

