
const getPath = (index, isBuy) => {

    //console.log("isBuy", isBuy);
    const WETH = SWAP_META_DATA[index]["2"]

    let inputToken
    let outToken
    if (isBuy) {
        inputToken = currentBuyTokenTypeToToken()
        outToken = currentContract()
    } else {
        inputToken = currentContract()
        outToken = currentSellTokenToTokenType()
    }

    let input = inputToken
    if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        input = WETH
    }
    let out = outToken
    if (outToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        out = WETH
    }
    let pathArray = []

    // console.log(inputToken, outToken);

    pathArray.push([input, out])
    BASE_TOKEN_BASE_LIST.forEach(element => {
        let path = []
        if (inputToken != element && outToken != element) {
            //console.log(WETH);
            if (element == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                element = WETH
            }
            path.push(input)
            path.push(element)
            path.push(out)
            pathArray.push(path)
        }
    });

    //console.log('pathArray111111111 ', pathArray)


    if (SWAP_META_DATA[index]["3"] != SWAP_META_DATA[index]["2"]) {
        pathArray.forEach(element => {
            if (element.length > 2) {
                let path0 = element.slice(0, 2)
                path0.push(SWAP_META_DATA[index]["3"])
                path0 = path0.concat(element.slice(2, 3))
                pathArray.push(path0)
            }

        });
    }


    let pairs = []
    const factory = SWAP_META_DATA[index]["1"]
    const initCodeHash = SWAP_META_DATA[index]["5"]
    const initK = SWAP_META_DATA[index]["4"]
    pathArray.forEach(element => {
        //console.log(element);
        let pair0 = []
        for (let index = 0; index < element.length - 1; index++) {
            const token0 = element[index];
            const token1 = element[index + 1];
            //console.log(factory, token0, token1, initCodeHash);
            pair0.push(getV2Pair(factory, token0, token1, initCodeHash))
        }
        pairs.push(pair0)
    });

    // console.log(pairs);


    return {
        path: pathArray,
        pairs: pairs,
        k: initK
    }
}

const getAllSwapPath = (isBuy) => {
    if (isBuy == undefined) {
        isBuy = true
    }
    const len = SWAP_META_DATA_NUMBER
    let path = []
    let pairs = []
    let k = []
    for (let index = 1; index <= len; index++) {
        //console.log(getPath(index));
        const path_pair_K = getPath(index, isBuy)
        path.push(path_pair_K["path"])
        pairs.push(path_pair_K["pairs"])
        k.push(path_pair_K["k"])
    }
    //console.log(path);
    return {
        path: path,
        pairs: pairs,
        k: k
    }
}

const getCurrentSwapIdPath = (isBuy) => {
    const currentSwapId0 = currentSwapId();
    //console.log(currentSwapId0);
    if (isBuy == undefined) {
        isBuy = true
    }
    return getPath(currentSwapId0, isBuy)
}