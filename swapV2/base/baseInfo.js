const CHAIN_ID = '56'//BNB
const UINT_256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
//0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
const GAS_LIMIT = 6555555
const ERROR = {
    "0": "超过滑点,交易失败。。。",
    "insufficient funds for transfer": "BNB不足"
}
const BASE_TOKEN_MAP = {
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
        "Name": "BNB",
        "Decimals": "18"
    },
    "0x55d398326f99059fF775485246999027B3197955": {
        "Name": "USDT",
        "Decimals": "18"
    },
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
        "Name": "BUSDT",
        "Decimals": "18"
    },
}


const BASE_TOKEN_BASE_LIST = [
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "0x55d398326f99059fF775485246999027B3197955",
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
]
let BASE_TOKEN_MAP_MAX_NUMBER = 0
let BASE_TOKEN_LIST = []
for (const key in BASE_TOKEN_MAP) {
    BASE_TOKEN_LIST.push(key)
}
console.log(BASE_TOKEN_LIST);
const SWAP_INFO = {
    1: "pancakeSwap(薄饼)",
    2:"babySwap",
    3:"apeswap",
}
let SWAP_INFO_MAX_NUMBER = 0
for (const key in SWAP_INFO) {
    SWAP_INFO_MAX_NUMBER = key
}
let SWAP_INFO_LIST = []
for (let index = 0; index < SWAP_INFO_MAX_NUMBER; index++) {
    SWAP_INFO_LIST.push(SWAP_INFO[index + 1])
}
console.log(SWAP_INFO_LIST);
