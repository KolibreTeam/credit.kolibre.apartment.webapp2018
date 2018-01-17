/**
 * Created by long.jiang on 2017/6/21.
 */
var orderId = "";
var totalAmount = 0;
var amount = "";
var paymentTime = "";
//
var transactionId = "";
var isTransaction = true;
//
var validateAmount = function () {
    amount = $("#txtNotPaidAmount").val().replace(",", "");
    if (amount == "") {
        mui.toast("支付金额不能为空!");
        return false;
    }
    amount = parseInt((parseFloat(amount) * 100).toFixed());
    if (amount > totalAmount || amount == "0") {
        mui.toast("支付金额输入错误!");
        return false;
    }
    return true;
};

var createTransaction = function (transactionMethod, callSuccess) {
    if (validateAmount()) {
        var data = {
            orderId: orderId,
            orderModel: "Normal",
            amount: amount,
            transactionCategory: "In",
            transactionMethod: transactionMethod,
            paymentSource: "Fengniaowu"
        };
        postInvoke(constants.URLS.CREATETRANSACTION, data, function (res) {
            if (res.succeeded) {
                callSuccess(res);
            } else {
                mui.toast(res.message);
            }
        });
    }
};

function zhifubao() {
    createTransaction("AliPay", function (res) {
        transactionId = res.data.transactionId;
        window.location.href = "precreate.html?transactionId={0}&amount={1}&paymentTime={2}".format(transactionId, amount, paymentTime.substring(0, 10));
    });
}

//创建交易流水
var weixinpay = function () {
    createTransaction("WeiXin", function (res) {
        transactionId = res.data.transactionId;
        var code = getURLQuery("code");
        var user = {
            appId: constants.CONFIGS.APPID,
            code: code
        };
        postInvoke(constants.URLS.GETWECHATOPENID, user, function (res1) {
            if (res1.succeeded) {
                var pay = {
                    openId: res1.data,
                    transactionId: transactionId
                };
                postInvoke(constants.URLS.ORDERPAYMENT, pay, function (res2) {
                    if (res2.succeeded) {
                        WeixinJSBridge.invoke('getBrandWCPayRequest', {
                            "appId": res2.data.appId,
                            "timeStamp": res2.data.timeStamp,
                            "nonceStr": res2.data.nonceStr,
                            "package": res2.data.package,
                            "signType": res2.data.signType,
                            "paySign": res2.data.paySign
                        });
                        setInterval(function () {
                            queryTransaction();
                        }, 2000);
                    } else {
                        mui.toast(res2.message);
                    }
                });
            } else {
                mui.toast(res1.message);
            }
        });
    });
};

function weixin() {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', weixinpay(), false);
        }
        else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', weixinpay());
            document.attachEvent('onWeixinJSBridgeReady', weixinpay());
        }
    }
    else {
        weixinpay();
    }
}

var queryTransaction = function () {
    if (transactionId != "" && isTransaction) {
        isTransaction = false;
        getInvoke(constants.URLS.GETTRANSACTION.format(transactionId), function (res) {
            isTransaction = true;
            if (res.succeeded) {
                if (res.data.transactionState === "Succeed") {
                    window.location.href = "bill.html?r=" + new Date();
                }
            }
        });
    }
};

var queryOrderbyOrderId = function () {
    orderId = getURLQuery("orderId");
    getInvoke(constants.URLS.GETORDERBYORDERID.format(orderId), function (res) {
        if (res.succeeded) {
            paymentTime = res.data.paymentTime;
            totalAmount = res.data.totalAmount;
            $("#lbTotalAmount").html((res.data.totalAmount * 0.01).toFixed(2));
            $("#lbNotPaidAmount").html((res.data.repayAmount * 0.01).toFixed(2));
            $("#txtNotPaidAmount").val((res.data.repayAmount * 0.01).toFixed(2));
            if (res.serviceCharge > 0) {
                $("#lbFree").html((res.data.serviceCharge * 0.01).toFixed(2));
                $("#divFee").show();
            }
            if (res.penaltyAmount > 0) {
                $("#lbPenalty").html((res.data.penaltyAmount * 0.01).toFixed(2));
                $("#divPenalty").show();
            }
            if (res.paidAmount > 0) {
                $("#lbPaidAmount").html((res.data.paidAmount * 0.01).toFixed(2));
                $("#divPaidAmount").show();
            }
            $("#txtNotPaidAmount").focus();
        }
    });
};

$(document).ready(function () {
    queryOrderbyOrderId();
});