// var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
// import NebPay from 'nebPay';
const nebPay = new NebPay();
let serialNumber,intervalQuery;

// var dappAddress = "n1sQNkEbMdFyNm9JpME1nLTyJHZdLYBqu8A";
var dappAddress = "n1zzrZPPDR2Lm8D9c9ZGM3Qd9qqfSAC3x1X";
    //here we use neb.js to call the "get" function to search from the Dictionary
var Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

const utils = {
    funcIntervalQuery:function() {
        console.log('called');
        nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
            .then(function (resp) {
                console.log("tx result: " + resp)   //resp is a JSON string
                var respObject = JSON.parse(resp)
                if(respObject.code === 0){
                    console.log(`set value succeed!`)
                    clearInterval(intervalQuery)
                }
            })
            .catch(function (err) {
                console.log(err);
                clearInterval(intervalQuery)
            });
    },
    search:function(gameId,cbSearch) {
        var from = Account.NewAccount().getAddressString();

        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "get";
        var callArgs = "[\"" + gameId + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            cbSearch(resp)
        }).catch(function (err) {
            //cbSearch(err)
            console.log("error:" + err.message)
        })
    },
    push:function(gameId,result,cbPush){
        var to = dappAddress;
        var value = "0";
        var callFunction = "save"
        var callArgs = "[\"" + gameId + "\",\"" + result + "\"]"

        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: cbPush        //设置listener, 处理交易返回信息
        });
        var self = this;
        if(intervalQuery) {
            clearInterval(intervalQuery);
        }
        intervalQuery = setInterval(this.funcIntervalQuery, 5000);
        console.log(intervalQuery);
        typeof this.funcIntervalQuery
    },
}

export default utils;