
let web3Nodes0 = []
let tempWeb3Nodes0 = []

const nodeUrls0 = ["https://bsc-dataseed2.defibit.io", "https://bsc-dataseed4.ninicoin.io", "https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed2.ninicoin.io", "https://bsc-dataseed3.ninicoin.io", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed3.defibit.io", "https://bsc-dataseed4.defibit.io", "https://bsc.rpc.blxrbdn.com", "https://rpc.ankr.com/bsc", "https://binance.nodereal.io", "https://bscrpc.com", "https://bsc.blockpi.network/v1/rpc/public", "https://bsc-mainnet.public.blastapi.io"]
let currentNodeUrls0 = [];
let tempWeb3NodeUrls0 = []
let nodesCount = 0;
(async () => {



    async function resetNode0() {
        tempWeb3Nodes0 = web3Nodes0
        tempWeb3NodeUrls0 = currentNodeUrls0
        currentNodeUrls0 = []
        web3Nodes0 = []
        for (let index = 0; index < nodeUrls0.length; index++) {
            const url = nodeUrls0[index];
            setTimeout(async () => {
                try {
                    await getBlockNumber(url)
                } catch (error) {
                }
            }, 0);
        }
    }
    async function getBlockNumber(url) {
        const startTime = new Date() / 1
        let res = await fetch(url, {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"eth_blockNumber\",\"params\":[]}",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        }).then(res => res.text())
        //console.log(parseInt(JSON.parse(res).result, 16));
        const endTime = new Date() / 1
        const timeGap = endTime - startTime
        //console.log(timeGap,parseInt(JSON.parse(res).result, 16));
        console.log();
        if (timeGap <= 700) {
            currentNodeUrls0.push(url)
            web3Nodes0.push(newWeb3(url))
        }
        //return parseInt(JSON.parse(res).result, 16)
    }
    setTimeout(() => {
        resetNode0()
    }, 100);

    setTimeout(() => {
        resetNode0()
    }, 1000);
    setTimeout(() => {
        resetNode0()
    }, 5000);
    setInterval(() => {
        resetNode0()
    }, 10000);

})()

function newWeb3(url) {
    if (Web3 != undefined) {
        let web3 = new Web3(url)
        return web3
    } else {
        throw ("NOT WEB3")
    }
}
function currentWeb3Nodes() {
    if (web3Nodes0.length <= 0) {
        return tempWeb3Nodes0
    } else {
        return web3Nodes0
    }
}
function currentWeb3NodeOne() {
    //$SetResuslt("")
    if (currentWeb3Nodes() <= 0) {

        console.log(` $SetResuslt("当前节点链接异常:请刷新或者开启VPN")`);
        //$SetResuslt("当前节点链接异常:请刷新或者开启VPN")
        return newWeb3("https://bsc-dataseed4.ninicoin.io")
    }
    nodesCount++
    let node = currentWeb3Nodes()
    let web3 = node[nodesCount % node.length]
    return web3
}


function currentWeb3UrlNodeOne() {
    urls = []
    if (currentNodeUrls0.length <= 0) {
        urls = tempWeb3NodeUrls0
    } else {
        urls = currentNodeUrls0
    }
    if (urls.length <= 0) {
        urls = ["https://bsc-dataseed4.ninicoin.io"]
    }
    nodesCount++
    return urls[nodesCount % urls.length]
}


