
const fromWei = (etherInput, uint) => {
    return ethUnit.fromWei(etherInput, uint)
}
const toWei = (etherInput, unit) => {
    return ethUnit.toWei(etherInput, unit)
}

const BN = (etherInput, unit) => {
    return new ethUnit.BN(etherInput, unit || 10)
}
const getV2Pair = (factory, token0, token1, initCodeHash) => {
    return ethUnit.getV2Pair(factory, token0, token1, initCodeHash)
}
const decodeParameters = (types, arg) => {
    return globalWeb3.eth.abi.decodeParameters(types, arg);
}

const hexToNumberString = (arg) => {
    return globalWeb3.utils.hexToNumberString(arg);
}

function getWbe3Methods(web30, abi, address) {
    if (abi == undefined) {
        return new web30.eth.Contract(abi.abi, abi.address).methods;
    } else {
        try {
            return new web30.eth.Contract(abi, address).methods;
        } catch (error) {
            console.log(String(error));
        }
    }
}


function $set(p1, p2) {
    let t = document.getElementById(p1);

    if (
        t.nodeName.toUpperCase() == 'SPAN' ||
        t.nodeName.toUpperCase() == 'P' ||
        t.nodeName.toUpperCase() == 'DIV'
    ) {
        t.innerHTML = p2
    } else if (t.nodeName.toUpperCase() == 'IMG') {
        t.src = p2
    } else {
        t.value = p2
    }
}

function $get(p1) {
    let t = document.getElementById(p1);
    if (t.nodeName.toUpperCase() != 'SPAN') {
        return t.value
    } else {
        return t.innerHTML
    }

}

const test = () => {

}


//获取前用户用key还是用钱包
const currentIsUserUseKey = () => {
    return $get("keys").length >= 64
}

//获取当前用户
const currentUser = () => {
    //$SetResuslt("")
    // if (currentWeb3Nodes() <= 0) {
    //     $SetResuslt("当前节点链接异常:刷新或者开启VPN")
    // }
    let web3CurrentProviderAddres

    try {
        web3CurrentProviderAddres = globalWeb3.currentProvider.selectedAddress
    } catch (error) {
        web3CurrentProviderAddres = null
    }
    if (currentIsUserUseKey()) {
        let Wallet0 = globalWeb3.eth.accounts.wallet
        Wallet0.clear()
        Wallet0.add({
            privateKey: currentKeys()
        })
        const user = Wallet0[0]["address"]
        Wallet0.clear()
        return user
    } else if (web3CurrentProviderAddres != null || web3CurrentProviderAddres != undefined) {
        return web3CurrentProviderAddres
    } else {
        return "0x0000000000000000000000000000000000000000"
    }
}

//获取key
const currentKeys = () => {
    let key = $get("keys")

    if (key.length == 64 || key.length == 66) {
        if (key.length == 64) {
            key = "0x" + key
        }
        return key
    } else {
        $SetResuslt("私钥错误")
        throw ("私钥错误")
    }
}
//获取用户花费多少马尼
const currentEthFeel = () => {
    return $get("EthFee")
}

//buy用户用TokenType购买代币
const currentBuyTokenTypeToToken = () => {
    return $get("buyAndSellType")
}
//buy用户用TokenType购买代币精度
const currentBuyTokenTypeToTokenDecimals = () => {
    const token = currentBuyTokenTypeToToken()
    return BASE_TOKEN_MAP[token]["Decimals"]
}

//sell用户卖出代币获取TokenType
const currentSellTokenToTokenType = () => {
    return $get("sellType")
}
//sell用户卖出代币TokenType 精度
const currentSellTokenToTokenTypeDecimals = () => {
    const token = currentSellTokenToTokenType()
    return BASE_TOKEN_MAP[token]["Decimals"]
}
const isAddress = (token) => {
    return globalWeb3.utils.isAddress(token)
}

const currentIsOutEth = () => {
    return currentSellTokenToTokenType() == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
}

const $SetResuslt = (content) => {
    $set("result", content || "")
}
//获取土狗合约
const currentContract = () => {
    const token = $get("contract")
    if (!isAddress(token)) {
        $SetResuslt("合约地址输入错误")
        throw ("合约地址输入错误")
    }
    return token
}

//获取当前swapId
const currentSwapId = () => {
    // let selectSwapID = document.getElementById("swapId");
    // return selectSwapID.value;
    return $get("swapId")
}


//是否检测
const currentCheck = () => {
    // let selectCheckID = document.getElementById("isPXop");
    // return selectCheckID.value;
    return $get("isPXop")
}
//获取gasPrice
const currentGasPrice = () => {
    let gasPrice = parseFloat($get("gasPrice"))
    if (gasPrice <= 5 && gasPrice != 1) {
        gasPrice = 5
    }
    if (gasPrice >= 20) {
        gasPrice = 20
    }
    console.log(String(gasPrice), "gwei");
    return String(gasPrice)
}
//获取滑点
const currentSlippage = () => {
    let slippage = $get("slippage")
    if (slippage <= 3) {
        slippage = 3
    }
    if (slippage >= 100) {
        slippage = 100
    }
    return slippage
}

//获取卖出数量
const currentSellNumber = () => {
    const balance = $get("sellNumber")

    //console.log("$$$$$$$$$$$$$$$$$$$$$$$", parseFloat(balance), parseFloat(balance) <= 0 || isNaN(parseFloat(balance)));
    if (parseFloat(balance) <= 0 || isNaN(parseFloat(balance))) {
        $SetResuslt("卖出数量错误")
        throw ("卖出数量错误")
    }
    return balance
}

//获取期望数量
const currentWantSellNumber = () => {
    return $get("wantSellNumber")
}
//获取止损预期数量
const currentWantSellNumberFuck = () => {
    const WantSellNumberFuck = $get("wantSellNumberFuck")
    const WantSellNumber = currentWantSellNumber()
    if (parseFloat(WantSellNumberFuck) > parseFloat(WantSellNumber)) {
        $SetResuslt("止损预期数量应该(<=)小于或者等于期望数量")
        throw ("止损预期数量应该(<=)小于或者等于期望数量")

    }
    return WantSellNumberFuck
}

//获取nonce
async function getTransactionNonce(account) {
    let nonce
    let web30 = currentWeb3NodeOne()
    try {
        nonce = await web30.eth.getTransactionCount(account)
    } catch (error) {
        nonce = await getTransactionNonce(account)
    }
    return nonce
}