

const DEXBaseTokenSwap = (
  pairs,
  path,
  to,
  k,
  amountOutMin,
  amountIn
) => {
  if (k >= 9000) {
    throw ("ERRORK_9900")
  }
  const web3 = currentWeb3NodeOne()
  getWbe3Methods(web3, DEX_SWAP_ABI, DEX_SWAP_TOKEN)

}


const buy = async () => {
  $SetResuslt()
  let user = currentUser()
  const balanceFeel = $get("EthFee")
  console.log(balanceFeel);
  if (balanceFeel =="" ||   parseFloat(balanceFeel)==0) {
    $SetResuslt("请输入正确的购买数量")
    throw("请输入正确的购买数量")
  }
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  const slippage = currentSlippage()
  let web30 = currentWeb3NodeOne()
  let nonce =await getTransactionNonce(user)
  //console.log(web30);
  const inputToken = currentBuyTokenTypeToToken()
  let DEXSwapGas = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  let DEXSwap;
  const isUserUseKey = currentIsUserUseKey()
  if (isUserUseKey) {
    console.log(currentKeys());
    web30.eth.accounts.wallet.clear()
    web30.eth.accounts.wallet.add({
      privateKey: currentKeys()
    })
    user = web30.eth.accounts.wallet[0]["address"]
    console.log('keyUser', user);
    DEXSwap = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  } else {
    user = currentUser()
    DEXSwap = getWbe3Methods(globalWeb3, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  }
  const amounts_pairs_path = await getDEXSWAPAmountsOutMax2()
  console.log(amounts_pairs_path);
  const amounts = amounts_pairs_path.amounts
  const pairs = amounts_pairs_path.pairs
  const path = amounts_pairs_path.path
  const k = amounts_pairs_path.k
  console.log(amounts[amounts.length - 1]);
  let amountOutMin = BN(amounts[amounts.length - 1]).mul(BN(String(100 - parseInt(slippage)))).div(BN('100')).toString()
  if (amountOutMin == '0' || amountOutMin == 0) {
    amountOutMin = '1'
  }
  console.log(amountOutMin);
  let ethBalanceFeel = '0'
  let tokenBalanceFeel = '0'
  if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    ethBalanceFeel = toWei(balanceFeel, 18).toString()
  } else {
    const decimals = currentBuyTokenTypeToTokenDecimals()
    tokenBalanceFeel = toWei(balanceFeel, decimals).toString()
  }


  try {
    let gasLimit = await DEXSwapGas.DEXBaseTokenSwap(
      pairs,
      path,
      k,
      amountOutMin,
      tokenBalanceFeel,
      parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
    ).estimateGas({
      from: user,
      value: ethBalanceFeel,
      gasPrice: gasPrice
    })
    if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 70000) {
      console.log(gasLimit);
      throw ("gasLimit-big")
    }
    console.log(gasLimit);
    $SetResuslt("上链中。。。")
    try {
      const success = await DEXSwap.DEXBaseTokenSwap(
        pairs,
        path,
        k,
        amountOutMin,
        tokenBalanceFeel,
        parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
      ).send({
        from: user,
        value: ethBalanceFeel,
        gasPrice: gasPrice,
        chainId: CHAIN_ID,
        nonce: nonce,
        gas: String(parseInt(gasLimit * 1.5))
      })
      console.log(success);
      $SetResuslt("交易成功:" + String(success.transactionHash))
    } catch (error) {
      $SetResuslt("交易失败:" + String(JSON.stringify(error)))
    }
  } catch (error) {
    console.log(error);
    $SetResuslt("调用失败:" + String(error))
  }



}

const buyV2 = async () => {
  $SetResuslt()
  let user = currentUser()
  const balanceFeel = $get("EthFee")
  console.log(parseFloat(balanceFeel)==0,parseFloat(balanceFeel));
  if (balanceFeel =="" ||  parseFloat(balanceFeel)==0) {
    $SetResuslt("请输入正确的购买数量")
    throw("请输入正确的购买数量")
  }
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  const slippage = currentSlippage()
  let web30 = currentWeb3NodeOne()
  let nonce =await getTransactionNonce(user)
  console.log("nonce",nonce);
  //console.log(web30);
  const inputToken = currentBuyTokenTypeToToken()
  let DEXSwapGas = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  let DEXSwap;
  const isUserUseKey = currentIsUserUseKey()
  if (isUserUseKey) {
    web30.eth.accounts.wallet.clear()
    web30.eth.accounts.wallet.add({
      privateKey: currentKeys()
    })
    user = web30.eth.accounts.wallet[0]["address"]
    console.log('keyUser', user);
    DEXSwap = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  } else {
    user = currentUser()
    DEXSwap = getWbe3Methods(globalWeb3, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  }
  const amounts_pairs_path = getCurrentSwapIdPath()
  console.log(amounts_pairs_path);
  const pairs = amounts_pairs_path.pairs
  const path = amounts_pairs_path.path
  const k = amounts_pairs_path.k
  let amountOutMin = '1'
  // console.log(amounts[amounts.length - 1]);
  // let amountOutMin = BN(amounts[amounts.length - 1]).mul(BN(String(100 - parseInt(slippage)))).div(BN('100')).toString()
  // if (amountOutMin == '0' || amountOutMin == 0) {
  //   amountOutMin = '1'
  // }
  // console.log(amountOutMin);
  let ethBalanceFeel = '0'
  let tokenBalanceFeel = '0'
  if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    ethBalanceFeel = toWei(balanceFeel, 18).toString()
  } else {
    const decimals = currentBuyTokenTypeToTokenDecimals()
    tokenBalanceFeel = toWei(balanceFeel, decimals).toString()
  }


  let time = 350
  allDisabled()
  let lockSwap = true
  let setIntervalId = setInterval(async () => {
    try {
      let gasLimit = await DEXSwapGas.DEXBaseTokensSwap(
        pairs,
        path,
        k,
        amountOutMin,
        tokenBalanceFeel,
        parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
      ).estimateGas({
        from: user,
        value: ethBalanceFeel,
        gasPrice: gasPrice
      })
      if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 70000) {
        console.log(gasLimit);
        throw ("gasLimit-big")
      }

      clearInterval(setIntervalId);
      if (lockSwap) {
        lockSwap = false
        allEnabled()
        $SetResuslt("上链中。。。")
        gasLimit = String(parseInt(gasLimit * 3))
        console.log("gasLimit", gasLimit);
        try {
          const success = await DEXSwap.DEXBaseTokensSwap(
            pairs,
            path,
            k,
            amountOutMin,
            tokenBalanceFeel,
            parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
          ).send({
            from: user,
            value: ethBalanceFeel,
            gasPrice: gasPrice,
            chainId: CHAIN_ID,
            nonce: nonce,
            gas: gasLimit
          })
          console.log(success);
          $SetResuslt("交易成功:" + String(success.transactionHash))
        } catch (error) {
          allEnabled()
          $SetResuslt("交易失败:" + String(JSON.stringify(error)))
        }
      }

    } catch (error) {

      console.log(error);
      $SetResuslt("调用失败:" + String(error))
    }



  }, time);


}



const approve = async () => {

  $SetResuslt()
  const inputToken = currentBuyTokenTypeToToken()
  console.log(inputToken);
  if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    return
  }

  const router = DEX_SWAP_TOKEN
  let user = currentUser()
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  let web30 = currentWeb3NodeOne()
  let DEXSwapGas = getWbe3Methods(web30, TOKEN_ABI, inputToken)
  let DEXSwap;
  const isUserUseKey = currentIsUserUseKey()
  if (isUserUseKey) {

    web30.eth.accounts.wallet.clear()
    web30.eth.accounts.wallet.add({
      privateKey: currentKeys()
    })
    user = web30.eth.accounts.wallet[0]["address"]
    console.log('keyUser', user);
    DEXSwap = getWbe3Methods(web30, TOKEN_ABI, inputToken)
  } else {
    user = currentUser()
    DEXSwap = getWbe3Methods(globalWeb3, TOKEN_ABI, inputToken)
  }
  const allownce = await DEXSwapGas.allowance(user, router).call()
  const total = await DEXSwapGas.totalSupply().call()

  console.log(allownce);

  if (BN(allownce).gte(BN(total))) {

    $SetResuslt("已授权过")
    throw ("已授权过")
  }

  let gasLimit = await DEXSwapGas.approve(router, UINT_256_MAX).estimateGas({
    from: user,
    gasPrice: gasPrice
  })

  console.log(gasLimit);
  if (parseInt(gasLimit) >= 600000) {
    $SetResuslt("该代币可能有问题超过了正常代币交易gas-NN倍")
    throw ("gasLimit-big")
  }
  $SetResuslt("正在授权。。。")
  const success = await DEXSwap.approve(router, UINT_256_MAX).send({
    from: user,
    gas: gasLimit,
    gasPrice: gasPrice
  })
  $SetResuslt("交易成功:" + String(success.transactionHash))

}


const isApprove = async () => {

}


const approveOther = async () => {

  $SetResuslt()
  const inputToken = currentContract()
  console.log(inputToken);
  if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    return
  }

  const router = DEX_SWAP_TOKEN
  let user = currentUser()
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  let web30 = currentWeb3NodeOne()
  let DEXSwapGas = getWbe3Methods(web30, TOKEN_ABI, inputToken)
  let DEXSwap;
  const isUserUseKey = currentIsUserUseKey()
  if (isUserUseKey) {

    web30.eth.accounts.wallet.clear()
    web30.eth.accounts.wallet.add({
      privateKey: currentKeys()
    })
    user = web30.eth.accounts.wallet[0]["address"]
    console.log('keyUser', user);
    DEXSwap = getWbe3Methods(web30, TOKEN_ABI, inputToken)
  } else {
    user = currentUser()
    DEXSwap = getWbe3Methods(globalWeb3, TOKEN_ABI, inputToken)
  }
  const allownce = await DEXSwapGas.allowance(user, router).call()
  const total = await DEXSwapGas.totalSupply().call()
  console.log(allownce, total);
  if (BN(allownce).gt(BN(total))) {
    $SetResuslt("已授权过")
    throw ("已授权过")
  }


  // if (BN(UINT_256_MAX).div(BN(2)).lt(BN(allownce))) {

  // }

  let gasLimit = await DEXSwapGas.approve(router, UINT_256_MAX).estimateGas({
    from: user,
    gasPrice: gasPrice
  })

  console.log(gasLimit);
  if (parseInt(gasLimit) >= 1000000) {
    $SetResuslt("该代币可能有问题超过了正常代币交易gas-NN倍")
    throw ("gasLimit-big")
  }
  $SetResuslt("正在授权。。。")
  const success = await DEXSwap.approve(router, UINT_256_MAX).send({
    from: user,
    gas: gasLimit,
    gasPrice: gasPrice,
    chainId: CHAIN_ID
  })
  $SetResuslt("交易成功:" + String(success.transactionHash))

}





const sell = async () => {
  $SetResuslt()
  let user = currentUser()
  const balanceFeel = currentSellNumber()
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  const slippage = currentSlippage()
  let web30 = currentWeb3NodeOne()
  let nonce =await getTransactionNonce(user)
  const ethBalanceFeel = "0"
  //console.log(web30);
  const outToken = currentSellTokenToTokenType()
  const inputToken = currentContract()
  let DEXSwapGas = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  let DEXSwap;
  const isUserUseKey = currentIsUserUseKey()
  if (isUserUseKey) {

    web30.eth.accounts.wallet.clear()
    web30.eth.accounts.wallet.add({
      privateKey: currentKeys()
    })
    user = web30.eth.accounts.wallet[0]["address"]
    console.log('keyUser', user);
    DEXSwap = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  } else {
    user = currentUser()
    DEXSwap = getWbe3Methods(globalWeb3, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  }
  const result = await multicallCall()
  const BalanceOf = result.BalanceOf
  const Decimals = result.Decimals
  const Allowance = result.Allowance
  globalDecimals = Decimals
  globalIsBuy = false
  const result00 = await multicallCall()
  globalIsBuy = true
  const amounts_pairs_path = result00.AmountsOutMax2
  console.log(amounts_pairs_path);
  const amounts = amounts_pairs_path.amounts
  const pairs = amounts_pairs_path.pairs
  const path = amounts_pairs_path.path
  const k = amounts_pairs_path.k
  console.log(amounts[amounts.length - 1]);
  let amountOutMin = BN(amounts[amounts.length - 1]).mul(BN(String(100 - parseInt(slippage)))).div(BN('100')).toString()
  if (amountOutMin == '0' || amountOutMin == 0) {
    amountOutMin = '1'
  }
  console.log("amountOutMin", amountOutMin);
  const tokenBalanceFeel = toWei(balanceFeel, Decimals).toString()
  console.log("tokenBalanceFeel", tokenBalanceFeel);
  const isOutEth = currentIsOutEth()
  try {
    let gasLimit = await DEXSwapGas.DEXTokenSwap(
      pairs,
      path,
      k,
      amountOutMin,
      tokenBalanceFeel,
      isOutEth,
      parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
    ).estimateGas({
      from: user,
      value: ethBalanceFeel,
      gasPrice: gasPrice
    })
    console.log(gasLimit);
    if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 70000) {
      console.log(gasLimit);
      throw ("gasLimit-big")
    }
    gasLimit = String(parseInt(gasLimit * 1.5))
    $SetResuslt("上链中。。。")
    try {
      const success = await DEXSwap.DEXTokenSwap(
        pairs,
        path,
        k,
        amountOutMin,
        tokenBalanceFeel,
        isOutEth,
        parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
      ).send({
        from: user,
        value: ethBalanceFeel,
        gasPrice: gasPrice,
        chainId: CHAIN_ID,
        nonce: nonce,
        gas: gasLimit
      })
      console.log(success);
      $SetResuslt("交易成功:" + String(success.transactionHash))
    } catch (error) {
      $SetResuslt("交易失败:" + String((error)))
    }
  } catch (error) {
    console.log(error);
    $SetResuslt("调用失败:" + String(error))
  }



}


const sellV2 = async () => {
  $SetResuslt()
  let user = currentUser()
  const balanceFeel = currentSellNumber()
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  const slippage = currentSlippage()
  const mintDecimals = currentSellTokenToTokenTypeDecimals()
  const WantSellNumber = toWei(currentWantSellNumber(), mintDecimals)
  const WantSellNumberFuck = toWei(currentWantSellNumberFuck(), mintDecimals)
  let web30 = currentWeb3NodeOne()
  let nonce =await getTransactionNonce(user)
  const ethBalanceFeel = "0"
  //console.log(web30);
  const outToken = currentSellTokenToTokenType()
  const inputToken = currentContract()
  let DEXSwapGas = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  let DEXSwap;
  const isUserUseKey = currentIsUserUseKey()
  if (isUserUseKey) {
    web30.eth.accounts.wallet.clear()
    web30.eth.accounts.wallet.add({
      privateKey: currentKeys()
    })
    user = web30.eth.accounts.wallet[0]["address"]
    console.log('keyUser', user);
    DEXSwap = getWbe3Methods(web30, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  } else {
    user = currentUser()
    DEXSwap = getWbe3Methods(globalWeb3, DEX_SWAP_ABI, DEX_SWAP_TOKEN)
  }
  const result = await multicallCall()
  const BalanceOf = result.BalanceOf
  const Decimals = result.Decimals
  const Allowance = result.Allowance
  globalDecimals = Decimals
  globalIsBuy = false
  const sellAmoutMethod = getDEXSWAPSellAmountsOutMax2Methods(false)['method']
  const path_pair_K = getDEXSWAPSellAmountsOutMax2Methods(false)['path_pair_K']
  globalIsBuy = true

  let amountOutMin = WantSellNumberFuck.mul(BN(String(100 - parseInt(slippage)))).div(BN('100')).toString()
  if (amountOutMin == '0' || amountOutMin == 0) {
    amountOutMin = '1'
  }

  const tokenBalanceFeel = toWei(balanceFeel, Decimals).toString()
  const isOutEth = currentIsOutEth()
  console.log("amountOutMin", amountOutMin);
  console.log("tokenBalanceFeel", tokenBalanceFeel);

  let count = 0
  let time = 400
  let lockSwap = true
  allDisabled()
  let setIntervalId = setInterval(async () => {

    console.log(count, time);
    console.log("START1");
    
    const amount_index_local = await sellAmoutMethod.call()

    
    console.log(amount_index_local);
    const amounts = amount_index_local.amounts
    const outAmount = amounts[amounts.length - 1] //100


    
    // console.log(` WantSellNumber`, WantSellNumber.toString(), outAmount,BN(String(outAmount)).gte(WantSellNumber));

    // console.log(` WantSellNumberFuck`, WantSellNumberFuck.toString(), outAmount, BN(String(outAmount)).lte(WantSellNumberFuck));

    //$SetResuslt("当前卖出可获得：" )
    if (WantSellNumber.lte(BN(String(outAmount))) || WantSellNumberFuck.gte(BN(String(outAmount)))) {
        console.log(`WantSellNumber.lte(BN(String(outAmount))) || WantSellNumberFuck`);
      
      const path = path_pair_K["path"]
      const pairs = path_pair_K["pairs"]
      const k = path_pair_K["k"]
      const index = amount_index_local.index
      const localAmountsOutMax = amount_index_local.localAmountsOutMax
      console.log(amounts, index, localAmountsOutMax);
      const pairs0 = pairs[index][localAmountsOutMax]
      const path0 = path[index][localAmountsOutMax]
      const k0 = k[index]
      try {

        let gasLimit = await DEXSwapGas.DEXTokenSwap(
          pairs0,
          path0,
          k0,
          amountOutMin,
          tokenBalanceFeel,
          isOutEth,
          parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
        ).estimateGas({
          from: user,
          value: ethBalanceFeel,
          gasPrice: gasPrice
        })
        if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 70000) {
          console.log(gasLimit);
          throw ("gasLimit-big")
        }


        gasLimit = String(parseInt(gasLimit * 1.5))

        console.log("gasLimit", gasLimit);
        clearInterval(setIntervalId);
        if (lockSwap) {
          lockSwap = false
          allEnabled()
          console.log(gasLimit);
          $SetResuslt("上链中。。。")
          try {
            const success = await DEXSwap.DEXTokenSwap(
              pairs0,
              path0,
              k0,
              amountOutMin,
              tokenBalanceFeel,
              isOutEth,
              parseFloat(currentGasPrice()) == 1 ? false : globalCHIEnable
            ).send({
              from: user,
              value: ethBalanceFeel,
              gasPrice: gasPrice,
              chainId: CHAIN_ID,
              nonce: nonce,
              gas: gasLimit
            })
            console.log(success);
            $SetResuslt("交易成功:" + String(success.transactionHash))

          } catch (error) {
            allEnabled()
            $SetResuslt("交易失败:" + String((error)))
          }
        }

      } catch (error) {

        console.log(error);
        $SetResuslt("调用失败:" + String(error)+"可能超过滑点范围")
      }
    } else {
      $SetResuslt("运行中"+count+":" + "当前可兑换: "+ fromWei(outAmount,mintDecimals))
    }
    count++
  }, time);











}

const maxNumber = async (base) => {
  const result = await multicallCall()
  const BalanceOf = result.BalanceOf
  const Decimals = result.Decimals
  const Allowance = result.Allowance
  const endBalanceOf = BN(String(BalanceOf)).div(BN(String(base))).toString()
  console.log(BalanceOf, Decimals, endBalanceOf);
  $set("sellNumber", fromWei(endBalanceOf, Decimals))
}