
// const getAmountsOutMax = async () => {
//     const web30 = currentWeb3NodeOne()
//     let DEXSwapGas = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
//     const path_pair_K = getCurrentSwapIdPath()
//     const path = path_pair_K["path"]
//     const pairs = path_pair_K["pairs"]
//     const k = path_pair_K["k"]
//     const amountIn = '9999999999'
//     const res = await DEXSwapGas.getAmountsOutMax(amountIn, k, pairs, path).call()
//     console.log(res);
// }

const getDEXSWAPAmountsOutMax2 = async (isBuy) => {
    const user = currentUser()
    const web30 = currentWeb3NodeOne()
    const router = DEX_SWAP_TOKEN
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const path_pair_K = getAllSwapPath(isBuy)
    console.log(path_pair_K);
    const path = path_pair_K["path"]
    const pairs = path_pair_K["pairs"]
    const k = path_pair_K["k"]
    const amountIn = toWei(currentEthFeel(), currentBuyTokenTypeToTokenDecimals())
    //console.log(amountIn, k, pairs, path);
    const amount_index_local = await Multicall.getAmountsOutMax2(user,router, amountIn, k, pairs, path).call()
    console.log(amount_index_local);
    const amounts = amount_index_local.amounts
    const index = amount_index_local.index
    const localAmountsOutMax = amount_index_local.localAmountsOutMax
    console.log(amounts, index, localAmountsOutMax);
    return {
        amounts: amounts,
        pairs: pairs[index][localAmountsOutMax],
        path: path[index][localAmountsOutMax],
        k: k[index],
    }
}


const getDEXSWAPSellAmountsOutMax2Methods = (isBuy) => {
    const user = currentUser()
    const web30 = currentWeb3NodeOne()
    const router = DEX_SWAP_TOKEN
    let Multicall = getWbe3Methods(web30, MULTIC_CALL_ABI, MULTIC_CALL_TOKEN)
    const path_pair_K = getAllSwapPath(isBuy)
    console.log(path_pair_K);
    const path = path_pair_K["path"]
    const pairs = path_pair_K["pairs"]
    const k = path_pair_K["k"]
    //const amountIn = toWei(currentEthFeel(), currentBuyTokenTypeToTokenDecimals())
    console.log(currentSellNumber(),globalDecimals);
    const amountIn = toWei(currentSellNumber(), globalDecimals).toString()
    console.log(amountIn);
    //console.log(amountIn, k, pairs, path);
    const amount_index_local = Multicall.getAmountsOutMax2(user,router, amountIn, k, pairs, path)
    // console.log(amount_index_local);
    // const amounts = amount_index_local.amounts
    // const index = amount_index_local.index
    // const localAmountsOutMax = amount_index_local.localAmountsOutMax
    // console.log(amounts, index, localAmountsOutMax);
    // return {
    //     amounts: amounts,
    //     pairs: pairs[index][localAmountsOutMax],
    //     path: path[index][localAmountsOutMax],
    //     k: k[index],
    // }

    return {
        method:amount_index_local,
        path_pair_K:path_pair_K
    }
}
(async () => {
    //  setInterval(async() => {
    //    console.log(await getAmountsOutMax2());
    //  }, 500);

})()