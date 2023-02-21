
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
    const weth = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    const usdt = '0x55d398326f99059ff775485246999027b3197955'
    const busdt = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
    const ball = '0x155da5619a9bea25f0f57f15297a8dba6bb28198'
    const fist = '0xc9882def23bc42d53895b8361d0b1edc7570bc6a'
    const fst_weth = '0x0efb5fd2402a0967b92551d6af54de148504a115'
    const OSK = '0x04fa9eb295266d9d4650edcb879da204887dc3da'
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
    //---------ETH->USDT->fist->token------------------------------
    let fstOSKpathBuy = []
    fstOSKpathBuy.push(weth)
    fstOSKpathBuy.push(usdt)
    fstOSKpathBuy.push(fist)
    fstOSKpathBuy.push(OSK)
    fstOSKpathBuy.push(contract)


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

    //--------token->OSK->fist->USDT->ETH------------------------------------
    let fstOSKpathSell = []
    fstOSKpathSell.push(contract)
    fstOSKpathSell.push(OSK)
    fstOSKpathSell.push(fist)
    fstOSKpathSell.push(usdt)
    fstOSKpathSell.push(weth)
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
    // if (index == 5 || index == 999) {
    //     if (index != 999) {
    //         pathsSell.pop(BUSDpathSell)
    //         pathsBuy.pop(BUSDpathBuy)
    //     }
    //     pathsSell.push(BallpathSell)
    //     pathsBuy.push(BallpathBuy)
    // }
    // if (index == 6 || index == 999) {
    //     if (index != 999) {
    //         pathsSell.pop(BUSDpathSell)
    //         pathsBuy.pop(BUSDpathBuy)
    //     } else if (index == 999) {
    //         fstpathBuy[0] = fst_weth
    //         fstpathSell[fstpathSell.length - 1] = fst_weth
    //     }


    //     pathsSell.push(fstUSDTpathSell)
    //     pathsSell.push(fstpathSell)
    //    // pathsSell.push(fstOSKpathSell)


    //     pathsBuy.push(fstpathBuy)
    //     pathsBuy.push(fstUSDTpathBuy)
    //    // pathsBuy.push(fstOSKpathBuy)

    // }
    return {
        "buy": pathsBuy,
        'sell': pathsSell
    }
}

var buyHD = '1'
var sellHD = '1'
const getHD = async (swapId = 1) => {
    //const user = currentUser()
    const web30 = currentWeb3NodeOne()
    const balanceFeel = $get("EthFee")
    const contract = currentContract()
    const inputToken = currentBuyTokenTypeToToken()
    let pathsBuy = getpathsIndex(contract, 999).buy;
    let pathsSell = getpathsIndex(contract, 999).sell;
    let ethBalanceFeel = '0'
    if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        ethBalanceFeel = toWei(balanceFeel, 18).toString()
    } else {
        ethBalanceFeel = toWei(String(parseFloat(parseFloat(balanceFeel) / 250)), 18).toString()
    }
    //console.log(ethBalanceFeel);
    // console.log(pathsBuy, pathsSell, balanceFeel);
    let info = await getWbe3Methods(web30, GET_HD_ABI, GET_HD_TOKEN).getHD(pathsBuy, pathsSell, [swapId]).call({ from: "0x0000000000000000000000000000000000000000", value: ethBalanceFeel });
    //console.log(info);
    let buy = (((1 - (info.endbuy_ / info.startbuy_)) * 100))
    if (parseInt(buy) < 97) {
        buy -= 1.9
    }
    // var buyHD = '1'
    //var sellHD = '1'
    buy = buy.toFixed(4)
    if (buy < 0) {
        buy = 1
    }
    //10000
    let buyAndselllK = 1000
    if (buy <= 1.5 || isNaN(buy)) {
        buyHD = parseInt(2 * buyAndselllK)
    } else {
        buyHD = parseInt((buy * buyAndselllK) * 1.25)
    }
    // console.log(info.endsell_);
    //console.log(info.startsell_);
    let sell = (((1 - (info.endsell_ / info.startsell_)) * 100))
    if (parseInt(sell) < 97) {
        sell -= 1.9
    }
    sell = sell.toFixed(4)
    // console.log(buy, sell);
    sellHD = isNaN(parseInt(sell)) || parseInt(sell) <= 1.5 ? parseInt(2 * buyAndselllK) : parseInt((buy * buyAndselllK) * 1.25)
    let HDtxt = '买入滑点: ' + buy + "    ||   卖出滑点: " + sell + "  || 购买：" + info.isbuy_ + " ||  卖出：" + info.issell_
    $set("prop3", HDtxt)
}





