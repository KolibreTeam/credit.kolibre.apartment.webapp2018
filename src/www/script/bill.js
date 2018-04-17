var currentTab = 0;

function selectTabToggle(index) {
    if (currentTab != index) {
        currentTab = index;
        $('.selectTable td').removeClass('active');
        $('.selectTable td:eq(' + index + ')').addClass('active');
        findAllLeaseOrder(index);
    }
}

function findAllLeaseOrder(index) {
    $('ul.billList').html('');
    $('.nodataDiv').hide();
    var orderState = '';
    var nodataSpantext = '';
    $('#addHouseBtn').hide();
    if (index == 0) {
        orderState = 'NotPaid';
        nodataSpantext = '亲，本期账单已支付完成';
    }
    else {
        orderState = 'Paid';
        nodataSpantext = '亲，您没有已完成账单';
    }
    $('#nodataSpan').html(nodataSpantext);
    getInvoke(constants.URLS.QUERYALLORDERS.format(orderState), function (res) {
        if (res.data.orderResponse == null || res.data.orderResponse.length == 0) {
            $('.billList').html("").removeClass("active");
            $('.nodataDiv').show();
        }
        else {
            var billLists = res.data.orderResponse;
            var tplBill = $('#tplBill').html();
            var billHtmls = "";
            //
            var lbTime = "";
            var lbState = "";
            var imgTip = "";
            var lbTip = "";
            var lbTip2 = "";
            var payState2 = "";
            var totalAmount = "";
            var notPaidAmount = "";
            var btnBillPay = "";
            var free = "";
            //
            var item = null;
            for (var i = 0; i < billLists.length; i++) {
                item = billLists[i];
                if (item.serviceCharge > 0) {
                    free = "含{0}元手续费".format((item.serviceCharge / 100).toFixed(2));
                }
                if (item.penaltyAmount > 0) {
                    free = "含{0}元违约金".format((item.penaltyAmount / 100).toFixed(2));
                }
                if (item.serviceCharge > 0 && item.penaltyAmount > 0) {
                    free = "含{0}元手续费、{1}元违约金".format((item.serviceCharge / 100).toFixed(2), (item.penaltyAmount / 100).toFixed(2));
                }
                if (item.orderState == 'Created') {
                    totalAmount = '¥' + (item.totalAmount / 100).toFixed(2);
                    notPaidAmount = ((item.totalAmount - item.paidAmount) / 100).toFixed(2);
                    lbTime = '账单到期日：' + moment(item.paymentTime).format('YYYY-MM-DD');
                    lbState = '<span class="state {0}">未支付</span>'.format(item.isCurrent ? "created" : "");
                    imgTip = "{0}".format(item.isCurrent ? "images/billtip0.png" : "images/billtip1.png");
                    lbTip = "<span style='color:{0}'>{1}月</span>".format((item.isCurrent ? "#ff8c14" : "#999999"), moment(item.paymentTime).format('MM'));
                    lbTip2 = "待支付";
                    payState2 = (item.isCurrent ? "active" : "normal");
                    btnBillPay = (item.isCurrent ? '<span class="billbtnPay btnActive" onclick="createTransaction(\'' + item.orderId + '\')">立即支付</span>' : '<span class="billbtnNotPay">立即支付</span>');
                }
                else if (item.orderState == 'Overdue') {
                    totalAmount = '¥' + (item.totalAmount / 100).toFixed(2);
                    notPaidAmount = ((item.totalAmount - item.paidAmount) / 100).toFixed(2);
                    lbTime = '账单到期日：' + moment(item.paymentTime).format('YYYY-MM-DD');
                    lbState = '<span class="state overdue">已逾期</span>';
                    imgTip = "images/billtip0.png";
                    lbTip = "<span style='color:#ff8c14'>{0}月</span>".format(moment(item.paymentTime).format('MM'));
                    lbTip2 = "待支付";
                    payState2 = "active";
                    btnBillPay = '<span class="billbtnPay btnActive" onclick="createTransaction(\'' + item.orderId + '\')">立即支付</span>';
                }
                else if (item.orderState == 'Canceled') {
                    totalAmount = "";
                    notPaidAmount = (item.totalAmount / 100).toFixed(2);
                    lbTime = '退租日期：' + moment(item.checkoutTime).format('YYYY-MM-DD');
                    lbState = '<span class="state canceled">已取消</span>';
                    imgTip = "images/billtip1.png";
                    lbTip = "<span style='color:#999999'>{0}月</span>".format(moment(item.paymentTime).format('MM'));
                    lbTip2 = "";
                    payState2 = "finish";
                    btnBillPay = "";
                }
                else {
                    totalAmount = "";
                    notPaidAmount = (item.totalAmount / 100).toFixed(2);
                    lbTime = '支付时间：' + moment(item.actualPaymentTime).format('YYYY-MM-DD HH:mm');
                    lbState = '<span class="state paid">已支付</span>';
                    imgTip = "images/billtip1.png";
                    lbTip = "<span style='color:#999999'>{0}月</span>".format(moment(item.paymentTime).format('MM'));
                    lbTip2 = "";
                    payState2 = "finish";
                    btnBillPay = "";
                }
                billHtmls += tplBill.format(item.orderId, lbTime, lbState, imgTip, lbTip, item.roomNumber, (item.orderType == "CustomDeposit" ? item.orderTypeName : getOrderType(item.orderType)), item.apartmentName, totalAmount, notPaidAmount, payState2, lbTip2, free, btnBillPay);
                free = "";
            }
            if (orderState == "NotPaid") {
                $("#lbRecentOrderAmount").text(res.data.recentOrderAmount);
                $(".recentDays").eq((res.data.recentOrderAmount == 0 ? 0 : 1)).show();
                $('.billList').html(billHtmls).addClass("active");
            } else {
                $(".recentDays").hide();
                $('.billList').html(billHtmls).removeClass("active");
            }
        }
    });
}

function createTransaction(orderId) {
    if (isWeixin()) {
        var redirect_uri = encodeURIComponent(constants.URLS.WEBPAYURL.format(orderId));
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + constants.CONFIGS.APPID + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_base#wechat_redirect";
    } else {
        window.location.href = constants.URLS.WEBPAYURL.format(orderId);
    }
}

function view(orderId) {
    window.location.href = "billView.html?orderId={0}".format(orderId);
}

function closeApply() {
    $(".msg-alert").hide();
}

$(document).ready(function () {
    findAllLeaseOrder(0);
});
