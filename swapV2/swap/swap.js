

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
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  const slippage = currentSlippage()
  let web30 = currentWeb3NodeOne()

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
    const gasLimit = await DEXSwapGas.DEXBaseTokenSwap(
      pairs,
      path,
      k,
      amountOutMin,
      tokenBalanceFeel,
      false
    ).estimateGas({
      from: user,
      value: ethBalanceFeel,
      gasPrice: gasPrice
    })
    if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 80000) {
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
        false
      ).send({
        from: user,
        value: ethBalanceFeel,
        gasPrice: gasPrice,
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
  const gasPrice = toWei(currentGasPrice(), "gwei").toString()
  const slippage = currentSlippage()
  let web30 = currentWeb3NodeOne()

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
        false
      ).estimateGas({
        from: user,
        value: ethBalanceFeel,
        gasPrice: gasPrice
      })
      if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 80000) {
        console.log(gasLimit);
        throw ("gasLimit-big")
      }

      clearInterval(setIntervalId);
      if (lockSwap) {
        lockSwap = false
        allEnabled()
        $SetResuslt("上链中。。。")
        gasLimit = String(parseInt(gasLimit * 1.5))

        try {
          const success = await DEXSwap.DEXBaseTokensSwap(
            pairs,
            path,
            k,
            amountOutMin,
            tokenBalanceFeel,
            false
          ).send({
            from: user,
            value: ethBalanceFeel,
            gasPrice: gasPrice,
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
  const allownce = await DEXSwapGas.allowance(user, router)

  console.log(allownce);



  // if (BN(UINT_256_MAX).div(BN(2)).lt(BN(allownce))) {

  // }

  const gasLimit = await DEXSwapGas.approve(router, UINT_256_MAX).estimateGas({
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
    gasPrice: gasPrice
  })
  $SetResuslt("交易成功:" + String(success.transactionHash))

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
  const allownce = await DEXSwapGas.allowance(user, router)

  console.log(allownce);



  // if (BN(UINT_256_MAX).div(BN(2)).lt(BN(allownce))) {

  // }

  const gasLimit = await DEXSwapGas.approve(router, UINT_256_MAX).estimateGas({
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
    gasPrice: gasPrice
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
      false
    ).estimateGas({
      from: user,
      value: ethBalanceFeel,
      gasPrice: gasPrice
    })
    console.log(gasLimit);
    if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 80000) {
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
        false
      ).send({
        from: user,
        value: ethBalanceFeel,
        gasPrice: gasPrice,
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
  const WantSellNumber = toWei(currentWantSellNumber(), currentSellTokenToTokenTypeDecimals())

  let web30 = currentWeb3NodeOne()
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

  let amountOutMin = WantSellNumber.mul(BN(String(100 - parseInt(slippage)))).div(BN('100')).toString()
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

    const amount_index_local = await sellAmoutMethod.call()
    console.log(amount_index_local);
    const amounts = amount_index_local.amounts
    const outAmount = amounts[amounts.length - 1]

    if (WantSellNumber.lt(BN(String(outAmount)))) {
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

        const gasLimit = await DEXSwapGas.DEXTokenSwap(
          pairs0,
          path0,
          k0,
          amountOutMin,
          tokenBalanceFeel,
          isOutEth,
          false
        ).estimateGas({
          from: user,
          value: ethBalanceFeel,
          gasPrice: gasPrice
        })
        if (parseInt(gasLimit) >= GAS_LIMIT || parseInt(gasLimit) <= 80000) {
          console.log(gasLimit);
          throw ("gasLimit-big")
        }
        gasLimit = String(parseInt(gasLimit * 1.5))
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
              false
            ).send({
              from: user,
              value: ethBalanceFeel,
              gasPrice: gasPrice,
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
        $SetResuslt("调用失败:" + String(error))
      }
    } else {

      $SetResuslt("运行中:" + String(error))

    }
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