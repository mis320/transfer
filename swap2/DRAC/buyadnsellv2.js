const weth = '0xc32dd456091F07d09C630043c560788fFCCbE77F'
const usdt = '0x1bd5489B37B45d6cfD7B91220a88B098Ff4a4203'


/* const swapInfo ={
    1:"pancakeSwap(薄饼)",
    2:"bakerySwap(面包)",
    3:"babySwap(北鼻)",
    4:"apeswap(猩猩)",
    5:"snowballswap(雪球)",
    6:"fstswap(盘古)",
    7:"",
    8:""
} */

function getpathsIndex(contract, index) {
    index;
    let WETH = weth


    //buy
    ///////////////////////////////////////////////////
    //----------ETH->token----------------------------------
    let ETHpathBuy = []
    ETHpathBuy.push(WETH)
    ETHpathBuy.push(contract)
    //----------ETH->USDT->token----------------------------------
    let USDpathBuy = []
    USDpathBuy.push(weth)
    USDpathBuy.push(usdt)
    USDpathBuy.push(contract)
    //-----------ETH->BUSDT->token---------------------------------
    // let BUSDpathBuy = []
    // BUSDpathBuy.push(weth)
    // BUSDpathBuy.push(busdt)
    // BUSDpathBuy.push(contract)



    //sell
    ///////////////////////////////////////////////////
    //---------token->ETH-----------------------------------
    let ETHpathSell = []
    ETHpathSell.push(contract)
    ETHpathSell.push(WETH)

    //---------token->USDT->ETH-----------------------------------
    let USDpathSell = []
    USDpathSell.push(contract)
    USDpathSell.push(usdt)
    USDpathSell.push(weth)
    //---------token->BUSDT->ETH------------------------------------
    // let BUSDpathSell = []
    // BUSDpathSell.push(contract)
    // BUSDpathSell.push(busdt)
    // BUSDpathSell.push(weth)
    //
    ///////////////////////////////////////////////////
    let pathsBuy = []
    pathsBuy.push(ETHpathBuy)
    pathsBuy.push(USDpathBuy)
    //pathsBuy.push(BUSDpathBuy)

    let pathsSell = []
    pathsSell.push(ETHpathSell)
    pathsSell.push(USDpathSell)
    //pathsSell.push(BUSDpathSell)

    ///////////////////////////////////////////////////

    return {
        "buy": pathsBuy,
        'sell': pathsSell
    }
}
















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
    let BallpathBuy = []
    BallpathBuy.push(weth)
    BallpathBuy.push(ball)
    BallpathBuy.push(contract)

    let pathsBuy = []
    pathsBuy.push(ETHpathBuy)
    pathsBuy.push(USDpathBuy)
    pathsBuy.push(BUSDpathBuy)
    pathsBuy.push(BallpathBuy)


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
    let BallpathSell = []
    BallpathSell.push(contract)
    BallpathSell.push(ball)
    BallpathSell.push(weth)
    let pathsSell = []
    pathsSell.push(ETHpathSell)
    pathsSell.push(USDpathSell)
    pathsSell.push(BUSDpathSell)
    pathsSell.push(BallpathSell)
    return {
        "buy": pathsBuy,
        'sell': pathsSell
    }

}