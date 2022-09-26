let web3Nodes = []
let web3Methods = []
let getInfoMethods = []
let tempNodes =[]
const nodeUrls = [
    'https://mainnet.ethereumpow.org',

]


let G_index = '1'
const CX_index = ['1', '2', '3']
const CHAIN_ID = '10001'//BNB
const swapInfo ={
    1:"lfgswap(lfgswap)",
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
const SWAP_TOKEN = '0xC3d830fB4eA13046f972656bb994B06ea8928164'
const GET_INFO_TOKEN = '0xc99F9fB9Cb015470efF9dcB058B7f68469209DBE'
const encrypt = 'whdcay8324291kjscbisfg8ginsid$@535612'
function web3NodesPush() {
    for (let index = 0; index < nodeUrls.length; index++) {
        const url = nodeUrls[index];
        let web3 = newWeb3(url)
        web3Nodes.push(web3)
        getInfoMethods.push(new web3.eth.Contract(GET_INFO_ABI, GET_INFO_TOKEN).methods)
        web3Methods.push(new web3.eth.Contract(gan_si_gou_zhuang_ABI, SWAP_TOKEN).methods)
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


var nodeUrlsLen =  nodeUrls.length
function newWeb3Router(k) {
    const url = nodeUrls[k % nodeUrlsLen];
    let web3 = newWeb3(url)
    return web3
}

function web3Router(k) {
    return web3Nodes[k % nodeUrlsLen]
}

function web3NodeSwap(k) {
    return web3Methods[k % nodeUrlsLen]
}

function getInfoRouter(k) {
    return getInfoMethods[k % nodeUrlsLen]
}
//web3Nodespush()
web3NodesPush()