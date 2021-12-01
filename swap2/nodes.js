let web3Nodes = []
let web3Methods = []
let getInfoMethods = []
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



const SWAP_TOKEN = '0xD71A8Aed37541983715fe35C9A08D4665b537d1A'
const GET_INFO_TOKEN = '0x8A0dc6be1963684D1C122Ca237052Fb495A97c48'
const encrypt = 'whdcay8324291kjscbisfg8ginsid$@535612'

function web3Nodespush() {
    for (let index = 0; index < nodeUrls.length; index++) {
        const url = nodeUrls[index];
        let web3 = newWeb3(url)
        web3Nodes.push(web3)
        getInfoMethods.push(new web3.eth.Contract(GET_INFO_ABI, GET_INFO_TOKEN).methods)
        web3Methods.push(new web3.eth.Contract(gan_si_gou_zhuang_ABI, SWAP_TOKEN).methods)
    }

    console.log('节点', web3Nodes);
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

function web3Router(k) {
    return web3Nodes[k % 14]
}


function web3NodeSwap(k) {
    return web3Methods[k % 14]
}

function getInfoRouter(k) {
    return getInfoMethods[k % 14]
}
//web3Nodespush()
web3Nodespush()
