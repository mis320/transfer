

const getEthBalance = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const user = currentUser()
    const res = Multicall.getEthBalance(user).encodeABI()
    //console.log(res);
    return res
}
const getTokensymbol = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = currentContract()
    const res = Multicall.getTokensymbol(token).encodeABI()
    return res
}
const getTokenBalanceOf = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = currentContract()
    const user = currentUser()
    const res = Multicall.getTokenBalanceOf(token, user).encodeABI()
    //console.log(res);
    return res
}
const getTokenDecimals = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = currentContract()
    const res = Multicall.getTokenDecimals(token).encodeABI()
    //console.log(res);
    return res
}
const getTokenTotalSupply = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = currentContract()
    const res = Multicall.getTokenTotalSupply(token).encodeABI()
    //console.log(res);
    return res
}
const getTokenAllowance = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = currentContract()
    const user = currentUser()
    const router = DEX_SWAP_TOKEN
    const res = Multicall.getTokenAllowance(token, user, router).encodeABI()
    //console.log(res);
    return res
}
const getCHIBalanceOf = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = CHI_TOKEN
    const user = currentUser()
    const res = Multicall.getTokenBalanceOf(token, user).encodeABI()
    //console.log(res);
    return res
}
const getCHIAllowance = () => {
    const web30 = globalWeb3
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const token = CHI_TOKEN
    const user = currentUser()
    const router = DEX_SWAP_TOKEN
    const res = Multicall.getTokenAllowance(token, user, router).encodeABI()
    //console.log(res);
    return res
}
const getAmountsOutMax2 = (isBuy) => {
    if (isBuy == undefined) {
        isBuy = true
    }
    const user = currentUser()
    const web30 = globalWeb3
    const router = DEX_SWAP_TOKEN
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const path_pair_K = getAllSwapPath(isBuy)
    const path = path_pair_K["path"]
    const pairs = path_pair_K["pairs"]
    const k = path_pair_K["k"]
    let amountIn = toWei(currentEthFeel() || "0.001", currentBuyTokenTypeToTokenDecimals()).toString()
    //const balanceFeel = currentSellNumber()
    //console.log(amountIn, k, pairs, path);
    if (!isBuy) {
        //console.log(globalDecimals);
        amountIn = toWei(currentSellNumber(), globalDecimals).toString()
    }
    const res = Multicall.getAmountsOutMax2(user, router, amountIn, k, pairs, path).encodeABI()
    return {
        hexCode: res,
        path_pair_K: path_pair_K
    }
}
const getBuyAndSellAmountsOutMax2 = (amountIn, isBuy) => {
    if (isBuy == undefined) {
        isBuy = true
    }
    const user = currentUser()
    const web30 = globalWeb3
    const router = DEX_SWAP_TOKEN
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const path_pair_K = getAllSwapPath(isBuy)
    const path = path_pair_K["path"]
    const pairs = path_pair_K["pairs"]
    const k = path_pair_K["k"]
    // console.log(path_pair_K);
    // let amountIn = toWei(currentEthFeel(), currentBuyTokenTypeToTokenDecimals()).toString()
    // //const balanceFeel = currentSellNumber()
    // //console.log(amountIn, k, pairs, path);
    // if (!isBuy) {
    //     console.log(globalDecimals);
    //     amountIn = toWei(currentSellNumber(), globalDecimals).toString()
    // }
    const res = Multicall.getAmountsOutMax2(user, router, amountIn, k, pairs, path).encodeABI()
    return {
        hexCode: res,
        path_pair_K: path_pair_K
    }
}
const getBuyAndSellAmountsOutMax2MulticallCall = async () => {
    const web30 = currentWeb3NodeOne()
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const currentBuyTokenTypeToTokenDecimals0 = currentBuyTokenTypeToTokenDecimals()
    const input = currentEthFeel() || "0.05"
    const buyHexCode = getBuyAndSellAmountsOutMax2(toWei(input, currentBuyTokenTypeToTokenDecimals0).toString()).hexCode
    const sellHexCode = getBuyAndSellAmountsOutMax2("-1", false).hexCode
    let Call = []
    const target = MULTIC_CALL_TOKEN
    //0
    Call.push({
        target: target,
        callData: buyHexCode
    })
    //1
    Call.push({
        target: target,
        callData: sellHexCode
    })
    Call.push({
        target: target,
        callData: getTokenDecimals()
    })
    Call.push({
        target: target,
        callData: getTokenBalanceOf()
    })
    Call.push({
        target: target,
        callData: getTokensymbol()
    })

    Call.push({
        target: target,
        callData: getCHIBalanceOf()
    })
    Call.push({
        target: target,
        callData: getCHIAllowance()
    })
    const res = await Multicall.aggregate(Call).call({ from: "0x2a86ec2430b95e88E8dFD230F00c16E0Dd2b999a" })
    let _r1 = decodeParameters(['uint256[]', 'uint256', "uint256"], res["returnData"][0])
    let _r2 = decodeParameters(['uint256[]', 'uint256', "uint256"], res["returnData"][1])
    //let _r3 = decodeParameters(['uint256[]', 'uint256', "uint256"], res["returnData"][2])
    //let _r2


    const Decimals = decodeParameters(["uint256"], res["returnData"][2])[0]

    globalDecimals = Decimals
    const BalanceOf = decodeParameters(["uint256"], res["returnData"][3])[0]
    const Name = decodeParameters(["string"], res["returnData"][4])[0]
    globalName = Name
    const CHIBalance = decodeParameters(["uint256"], res["returnData"][5])[0]
    const CHIAllowance = decodeParameters(["uint256"], res["returnData"][6])[0]
    const amount0 = _r1[0][_r1[0].length - 1]

    // console.log(_r1);

    const amount1 = _r2[0][_r2[0].length - 1]
    //const amountIn0 = currentEthFeel()
    console.log(CHIBalance, CHIAllowance);
    if (parseInt(String(CHIBalance)) >= 5 && parseInt(String(CHIAllowance)) >= 5) {
        globalCHIEnable = true
    } else {
        globalCHIEnable = false
    }
    $set("prop1", input + BASE_TOKEN_MAP[currentBuyTokenTypeToToken()]["Name"] + "估计可以买入:" + fromWei(amount0, Decimals) + Name)
    $set("prop2", fromWei(BalanceOf, Decimals) + "  " + Name + "卖出估计可得:" + fromWei(amount1, currentBuyTokenTypeToTokenDecimals0) + "  " + BASE_TOKEN_MAP[currentSellTokenToTokenType()]["Name"])
    return {
        index: _r1[1],
        local: _r1[2]
    }
}

const getPool = async (index, local) => {
    const path_pair_K = getAllSwapPath()
    const path = path_pair_K["path"]
    // const pairs = path_pair_K["pairs"]
    // const k = path_pair_K["k"]
    const swapId = String(parseInt(index) + 1)

    const factory = SWAP_META_DATA[swapId]["1"]
    const initCodeHash = SWAP_META_DATA[swapId]["5"]
    const initK = SWAP_META_DATA[swapId]["4"]
    const poolPath = path[index][local]
    console.log(poolPath);
    pair0 = getV2Pair(factory, poolPath[poolPath.length - 1], poolPath[poolPath.length - 2], initCodeHash)
    console.log(pair0, poolPath[poolPath.length - 2], poolPath[poolPath.length - 1]);

    const web30 = currentWeb3NodeOne()
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    let token0BalanceOfHex = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN).getTokenBalanceOf(poolPath[poolPath.length - 2], pair0).encodeABI()
    let token1BalanceOfHex = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN).getTokenBalanceOf(poolPath[poolPath.length - 1], pair0).encodeABI()
    const target = MULTIC_CALL_TOKEN
    //0
    let Call = []
    Call.push({
        target: target,
        callData: token0BalanceOfHex
    })
    //1
    Call.push({
        target: target,
        callData: token1BalanceOfHex
    })
    const res = await Multicall.aggregate(Call).call()
    token0b = decodeParameters(["uint256"], res["returnData"][0])[0]
    token1b = decodeParameters(["uint256"], res["returnData"][1])[0]
    console.log(BASE_TOKEN_MAP);
    console.log();
    $set("prop4", fromWei(token0b, BASE_TOKEN_MAP[poolPath[poolPath.length - 2]]["Decimals"]) + " " + BASE_TOKEN_MAP[poolPath[poolPath.length - 2]]["Name"] + "||" + fromWei(token1b, globalDecimals) + " " + globalName)
    console.log(token0b, token1b);
}



const multicallCall = async () => {
    const web30 = currentWeb3NodeOne()
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    let Call = []
    const target = MULTIC_CALL_TOKEN
    const EthBalance = getEthBalance()
    const BalanceOf = getTokenBalanceOf()
    const Decimals = getTokenDecimals()
    const TotalSupply = getTokenTotalSupply()
    const Allowance = getTokenAllowance()
    const AmountsOutMax2 = getAmountsOutMax2(globalIsBuy)
    //console.log(EthBalance,BalanceOf,Decimals,TotalSupply,Allowance);
    //0
    Call.push({
        target: target,
        callData: EthBalance
    })
    //1
    Call.push({
        target: target,
        callData: BalanceOf
    })
    //2
    Call.push({
        target: target,
        callData: Decimals
    })
    //3
    Call.push({
        target: target,
        callData: TotalSupply
    })
    //4
    Call.push({
        target: target,
        callData: Allowance
    })
    //5
    Call.push({
        target: target,
        callData: AmountsOutMax2.hexCode
    })
    //console.log(Call);
    const res = await Multicall.aggregate(Call).call()
    //console.log(res);



    const path_pair_K = AmountsOutMax2.path_pair_K
    const path = path_pair_K["path"]
    const pairs = path_pair_K["pairs"]
    const k = path_pair_K["k"]
    let _r5 = decodeParameters(['uint256[]', 'uint256', "uint256"], res["returnData"][5])
    //console.log(path_pair_K);
    //console.log(_r5);

    const index = _r5[1]
    const local = _r5[2]
    globalIsBuy = true
    return {
        EthBalance: decodeParameters(["uint256"], res["returnData"][0])[0],
        BalanceOf: decodeParameters(["uint256"], res["returnData"][1])[0],
        Decimals: decodeParameters(["uint256"], res["returnData"][2])[0],
        TotalSupply: decodeParameters(["uint256"], res["returnData"][3])[0],
        Allowance: decodeParameters(["uint256"], res["returnData"][4])[0],
        AmountsOutMax2: {
            amounts: _r5[0],
            pairs: pairs[index][local],
            path: path[index][local],
            k: k[index],
        },
    }
}
getBuyAndSellAmountsOutMax2MulticallCall()
setInterval(async () => {
    if ($get("contract").length >= 42) {
        const { index, local } = await getBuyAndSellAmountsOutMax2MulticallCall()
        console.log(index, local);

        getPool(index, local)
        getHD()
    }

}, 3000);


