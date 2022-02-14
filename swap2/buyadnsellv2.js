const weth = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const usdt = '0x55d398326f99059ff775485246999027b3197955'
const busdt = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
const ball = '0x155da5619a9bea25f0f57f15297a8dba6bb28198'
const fist = '0xc9882def23bc42d53895b8361d0b1edc7570bc6a'
const fst_weth = '0x0efb5fd2402a0967b92551d6af54de148504a115'
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
    let WETH = weth
    if (index == 6) {
        WETH = fst_weth
    }


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
    let BUSDpathBuy = []
    BUSDpathBuy.push(weth)
    BUSDpathBuy.push(busdt)
    BUSDpathBuy.push(contract)

    //---------ETH->ball->token-----------------------------------
    let BallpathBuy = []
    BallpathBuy.push(weth)
    BallpathBuy.push(ball)
    BallpathBuy.push(contract)




    //---------ETH->fist->token-----------------------------------
    let fstpathBuy = []
    fstpathBuy.push(WETH)
    fstpathBuy.push(fist)
    fstpathBuy.push(contract)


    //---------ETH->USDT->fist->token------------------------------
    let fstUSDTpathBuy = []
    fstUSDTpathBuy.push(weth)
    fstUSDTpathBuy.push(usdt)
    fstUSDTpathBuy.push(fist)
    fstUSDTpathBuy.push(contract)
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
    let BUSDpathSell = []
    BUSDpathSell.push(contract)
    BUSDpathSell.push(busdt)
    BUSDpathSell.push(weth)
    //---------token->ball->ETH---------------------------------
    let BallpathSell = []
    BallpathSell.push(contract)
    BallpathSell.push(ball)
    BallpathSell.push(weth)
    //--------token->fist->ETH------------------------------------
    let fstpathSell = []
    fstpathSell.push(contract)
    fstpathSell.push(fist)
    fstpathSell.push(WETH)
    //--------token->fist->USDT->ETH------------------------------------
    let fstUSDTpathSell = []
    fstUSDTpathSell.push(contract)
    fstUSDTpathSell.push(fist)
    fstUSDTpathSell.push(usdt)
    fstUSDTpathSell.push(weth)
    //
    ///////////////////////////////////////////////////
    let pathsBuy = []
    pathsBuy.push(ETHpathBuy)
    pathsBuy.push(USDpathBuy)
    pathsBuy.push(BUSDpathBuy)

    let pathsSell = []
    pathsSell.push(ETHpathSell)
    pathsSell.push(USDpathSell)
    pathsSell.push(BUSDpathSell)
    ///////////////////////////////////////////////////
    if (index == 5 || index == 999) {
        if (index != 999) {
            pathsSell.pop(BUSDpathSell)
            pathsBuy.pop(BUSDpathBuy)
        }
        pathsSell.push(BallpathSell)
        pathsBuy.push(BallpathBuy)
    }
    if (index == 6 || index == 999) {
        if (index != 999) {
            pathsSell.pop(BUSDpathSell)
            pathsBuy.pop(BUSDpathBuy)
        } else if (index == 999) {
            fstpathBuy[0] = fst_weth
            fstpathSell[fstpathSell.length - 1] = fst_weth
        }
        pathsSell.push(fstUSDTpathSell)
        pathsSell.push(fstpathSell)
        pathsBuy.push(fstpathBuy)
        pathsBuy.push(fstUSDTpathBuy)
    }
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
