/**
 * Created by long.jiang on 2017/6/21.
 */

var isTransaction = true;
var transactionId = "";
//
var queryTransaction = function () {
    if (transactionId != "" && isTransaction) {
        isTransaction = false;
        getInvoke(constants.URLS.GETTRANSACTION.format(transactionId), function (res) {
            isTransaction = true;
            if (res.transactionState === "Succeed") {
                window.location.href = "bill.html";
            }
        });
    }
};

$(document).ready(function () {
    var amount = getURLQuery("amount");
    transactionId = getURLQuery("transactionId");
    $("#lbTotalAmount").html((amount / 100).toFixed(2));
    var pay = {
        transactionId: transactionId
    };
    postInvoke(constants.URLS.ORDERPAYMENT, pay, function (res) {
        if (res.succeeded) {
            $(".spinner").hide();
            $("#imgPay").attr("src", res.data.qrCode).show();
            setInterval(function () {
                queryTransaction();
            }, 2000);
        } else {
            mui.toast(res.message);
        }
    });
});