let web3Nodes = []
let web3Methods = []
let getInfoMethods = []
let tempNodes =[]
const nodeUrls = [
    'https://bsc-dataseed4.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed.binance.org',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.ninicoin.io',
    'https://bsc-dataseed3.ninicoin.io',
    'https://bsc-dataseed4.ninicoin.io',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-dataseed4.defibit.io',
    'https://binance.ankr.com',
    'http://bsc.mytokenpocket.vip'
]



let txtInfo=''
const txtInfoArray=[
    "新版本(待改进):https://mis320.github.io/transfer/swapV2/"
    '初始化完成,轮询类型需要选择swap。',
    '普通 购买 卖出 ,请用 购入,卖出 按键自己调滑点调滑点调滑点(防止被夹)',
    '轮训购买无视滑点谨慎使用',
    '轮询类型不支持多私钥',
    '注意:输入框不能有多余的换行符',
]

for (let index = 0; index < txtInfoArray.length; index++) {
    const txt = txtInfoArray[index];
    txtInfo = txtInfo+txt+"\n"
}


let G_index = '1'
const CX_index = ['1', '3', '4', '5', '6']
const CHAIN_ID = '56'//BNB
const swapInfo ={
    1:"pancakeSwap(薄饼)",
    2:"test(test)",
    3:"babySwap(北鼻)",
    4:"apeswap(猩猩)",
    5:"snowballswap(雪球)",
    6:"fstswap(盘古)",
}
let max=0
for (const key in swapInfo) {
    max = key
}
const swapInfoList = []
for (let index = 0; index < max; index++) {
    swapInfoList.push(swapInfo[index+1])  
}
console.log(swapInfoList);

const unitMap = {
    '0': '0', // eslint-disable-line
    '1': '10', // eslint-disable-line
    '2': '100', // eslint-disable-line
    '3': '1000', // eslint-disable-line
    '4': '10000', // eslint-disable-line
    '5': '100000', // eslint-disable-line
    '6': '1000000', // eslint-disable-line
    '7': '10000000', // eslint-disable-line
    '8': '100000000', // eslint-disable-line
    '9': '1000000000', // eslint-disable-line
    '10': '10000000000', // eslint-disable-line
    '11': '100000000000', // eslint-disable-line
    '12': '1000000000000', // eslint-disable-line
    '13': '10000000000000', // eslint-disable-line
    '14': '100000000000000', // eslint-disable-line
    '15': '1000000000000000', // eslint-disable-line
    '16': '10000000000000000', // eslint-disable-line
    '17': '100000000000000000', // eslint-disable-line
    '18': '1000000000000000000', // eslint-disable-line
    '19': '10000000000000000000', // eslint-disable-line
    '20': '100000000000000000000', // eslint-disable-line
    '21': '1000000000000000000000', // eslint-disable-line
    '22': '10000000000000000000000', // eslint-disable-line
    '23': '100000000000000000000000', // eslint-disable-line
    '24': '1000000000000000000000000', // eslint-disable-line
    '25': '10000000000000000000000000', // eslint-disable-line
    '26': '100000000000000000000000000',
    'ether': "1000000000000000000",
    'gwei': "1000000000",
    'Gwei': "1000000000"
 };
 //0x3a849487c0099240493B1786D2da042A4Bf8d501
const SWAP_TOKEN = '0x3a849487c0099240493B1786D2da042A4Bf8d501'
const GET_INFO_TOKEN = '0xF60fDf54f222120E6242efbcbF5b97A49fD334Fc'
const encrypt = 'whdcay8324291kjscbisfg8ginsid$@535612'
function web3NodesPush() {
    for (let index = 0; index < nodeUrls.length; index++) {
        const url = nodeUrls[index];
        let web3 = newWeb3(url)
        web3Nodes.push(web3)
        getInfoMethods.push(new web3.eth.Contract(GET_INFO_ABI, GET_INFO_TOKEN).methods)
        web3Methods.push(new web3.eth.Contract(gan_si_gou_zhuang_ABI_end, SWAP_TOKEN).methods)
    }
    console.log('Nodes', web3Nodes);
}

function tempNodesPush(abi,token) {
    for (let index = 0; index < nodeUrls.length; index++) {
        const url = nodeUrls[index];
        let web3 = newWeb3(url)
        tempNodes.push(new web3.eth.Contract(abi, token).methods)
    }
    console.log('tempNodes', web3Nodes);
}

function newWeb3(url) {
    let web3 = new Web3(url)
    return web3
}

function accountWalletAdd(key) {
    for (let index = 0; index < web3Nodes.length; index++) {
        let web3 = web3Nodes[index];
        web3.eth.accounts.wallet.clear();
        web3.eth.accounts.wallet.add({
            privateKey: key
        });
        //console.log( web3.eth.accounts.wallet.encrypt(encrypt));
    }
}

function accountWalletClear() {
    for (let index = 0; index < web3Nodes.length; index++) {
        let web3 = web3Nodes[index];
        web3.eth.accounts.wallet.clear();
    }
}

function newWeb3Router(k) {
    const url = nodeUrls[k % 13];
    let web3 = newWeb3(url)
    return web3
}

function web3Router(k) {
    return web3Nodes[k % 13]
}

function web3NodeSwap(k) {
    return web3Methods[k % 13]
}

function getInfoRouter(k) {
    return getInfoMethods[k % 13]
}
//web3Nodespush()
const gan_si_gou_zhuang_ABI_end = [


    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[][]",
                "name": "paths",
                "type": "address[][]"
            },
            {
                "internalType": "uint256",
                "name": "minPoolETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minPoolUSDTOrOther",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "gan_si_gou_zhuang_buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "sellNum",
                "type": "uint256"
            },
            {
                "internalType": "address[][]",
                "name": "paths",
                "type": "address[][]"
            },
            {
                "internalType": "uint256",
                "name": "minsellETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "gan_si_gou_zhuang_sell",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "v",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getAmountsOutCall",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token0",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getPair",
        "outputs": [
            {
                "internalType": "address",
                "name": "WETHPari",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "USDTPari",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "BUSDTPari",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "platformTokenPari",
                "type": "address"
            },
            {
                "internalType": "uint256[4]",
                "name": "pool",
                "type": "uint256[4]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "v",
                "type": "uint256"
            },
            {
                "internalType": "address[][]",
                "name": "paths",
                "type": "address[][]"
            },
            {
                "internalType": "uint256[]",
                "name": "indexs",
                "type": "uint256[]"
            }
        ],
        "name": "getPathAmountS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amounts",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "MAXNUM",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },

    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "pairFor",
        "outputs": [
            {
                "internalType": "address",
                "name": "pair",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[][]",
                "name": "paths",
                "type": "address[][]"
            },
            {
                "internalType": "uint256",
                "name": "minPoolETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minPoolUSDTOrOther",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sellRatio",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPX",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "issell",
                "type": "bool"
            }
        ],
        "name": "safe_gan_si_gou_zhuang_buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]


web3NodesPush()
