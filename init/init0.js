
setTextareaWidth()
function setTextareaWidth() {
    setInterval(() => {
        let textareaDOM0 = document.getElementById("keys");
        let textareaDOM1 = document.getElementById("result");
        var clientWidth = document.documentElement.clientWidth;
        if (parseFloat(clientWidth) >= 500) {
            if (textareaDOM0.cols != "75" && textareaDOM1.cols != "75") {
                textareaDOM0.cols = "75"
                textareaDOM1.cols = "75"
            }
        } else {
            if (textareaDOM0.cols != "50" && textareaDOM1.cols != "50") {
                textareaDOM0.cols = "50"
                textareaDOM1.cols = "50"
            }
        }
    }, 500);
}
const selectSwapPush = document.getElementById("swapId");
for (let index = 0; index < SWAP_INFO_LIST.length; index++) {
    let newoption = new Option(SWAP_INFO_LIST[index], parseInt(index) + 1);
    selectSwapPush.options[selectSwapPush.options.length] = newoption;
}



const selectBaseTokenPush = document.getElementById("buyAndSellType");
for (let index = 0; index < BASE_TOKEN_LIST.length; index++) {
    //                            //key                                      //value
    let newoption = new Option(BASE_TOKEN_MAP[BASE_TOKEN_LIST[index]]["Name"], BASE_TOKEN_LIST[index]);
    selectBaseTokenPush.options[selectBaseTokenPush.options.length] = newoption;

}

let newoptiontemp = new Option('CHI(节省gas)', CHI_TOKEN);
selectBaseTokenPush.options[selectBaseTokenPush.options.length] = newoptiontemp;

const selecSelltBaseTokenPush = document.getElementById("sellType");

for (let index = 0; index < BASE_TOKEN_LIST.length; index++) {
    //                            //key                                      //value
    let newoption = new Option(BASE_TOKEN_MAP[BASE_TOKEN_LIST[index]]["Name"], BASE_TOKEN_LIST[index]);

    selecSelltBaseTokenPush.options[selecSelltBaseTokenPush.options.length] = newoption;
}
function setInfo() {
    console.log(">>>>>>>>>");
    let listUl = document.getElementById("xlSet");
    let listUl2 = document.getElementById("xlSet2");
    let DOM = document.getElementById("setInfoButton");
    if (listUl.style.display === "block") {
        listUl.style.display = "none";
        listUl2.style.display = "none";
        DOM.innerText = "展开设置(填写私钥)>>>>"
    } else {
        listUl.style.display = "block";
        listUl2.style.display = "block";
        DOM.innerText = "隐藏设置<<<<"
    }
}
function butt_MAX1() {
    let DOM = document.getElementById("butt_MAX");
    if (DOM.innerText == '最大值') {
        maxNumber(1)
        DOM.innerText = ' 50% '
    } else {
        maxNumber(2)
        DOM.innerText = '最大值'
    }
}


function approveButtonNone() {

    const inputToken = currentBuyTokenTypeToToken()
    console.log(inputToken);

    let listUl = document.getElementById("approve00");
    if (listUl.style.display === "") {
        if (inputToken == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
            listUl.style.display = "none";
        }
    } else {
        if (inputToken != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
            listUl.style.display = "";
        }

    }
}
const txtInfoArray = [
    '不用链接钱包也行',
    '初始化完成,轮询类型需要选择swap。',
    '普通 购买 卖出 ,请用 购入,卖出 按键自己调滑点调滑点调滑点(防止被夹),土狗怕买不进直接拉满',
    '轮训购买无视滑点谨慎使用',
    '暂时不支持多私钥，可先用老版本的',
    "https://mis320.github.io/transfer/swap2/",
    "购买1inch的CHI可以获得gas节省大并授权建议先购买1刀试试用",
    "CHI:0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
]
let TXT_INFO = ''
for (let index = 0; index < txtInfoArray.length; index++) {
    const txt = txtInfoArray[index];
    TXT_INFO = TXT_INFO + txt + "\n"
}

console.log(TXT_INFO);
const ethereumEnable = () => {
    try {
        if (window.ethereum != undefined) {
            web3Provider = window.ethereum;
            try {

                const account = window.ethereum.selectedAddress
                if (account == null || account == undefined) {
                    window.ethereum.enable()
                }
                if (globalWeb3 == undefined || globalWeb3 == null) {
                    globalWeb3 = new Web3(web3Provider);
                    $SetResuslt(TXT_INFO)
                }
            } catch (error) {
                if (globalWeb3 == undefined || globalWeb3 == null) {
                    let web30 = currentWeb3NodeOne()
                    globalWeb3 = new Web3(web30);
                    $SetResuslt(TXT_INFO)
                }
                //alert("请链接钱包")
                //console.error("User denied account access")
            }

        } else {

            if (globalWeb3 == undefined || globalWeb3 == null) {
                let web30 = currentWeb3NodeOne()
                globalWeb3 = new Web3(web30);
                $SetResuslt(TXT_INFO)
            }
            //alert("请链接钱包")
            //console.error("User denied account access")
        }
    } catch (error) {


        if (globalWeb3 == undefined || globalWeb3 == null) {
            let web30 = currentWeb3NodeOne()
            globalWeb3 = new Web3(web30);
            $SetResuslt(TXT_INFO)
        }
        //alert("请链接钱包")
        //console.error("User denied account access")
    }
}




function allDisabled() {
    document.getElementById('pollingBuy').disabled = 'disabled';
    document.getElementById('buy').disabled = 'disabled';
    document.getElementById('approve').disabled = 'disabled';
    document.getElementById('sell').disabled = 'disabled';
    document.getElementById('pollingSell').disabled = 'disabled';
}

function allEnabled() {
    document.getElementById('pollingBuy').disabled = false;
    document.getElementById('buy').disabled = false;
    document.getElementById('approve').disabled = false;
    document.getElementById('sell').disabled = false;
    //document.getElementById('sell2f').disabled = false;
    document.getElementById('pollingSell').disabled = false;
}