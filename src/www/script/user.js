
$(document).ready(function () {
    getInvoke(constants.URLS.GETCURRENTTENANT, function (res) {
        if (res.succeeded) {
            $('#lbRealName').text(res.data.realName);
            $('#lbCellphone').text(res.data.cellphone);
            if (res.data.hasInfo) {
                $("#needPhoto").show();
            } else {
                $("#needVerify").show();
            }
            $('#star').raty({
                score: parseFloat(res.data.creditRating) / 2,
                path: 'images/star',
                readOnly: true,
                size: 15
            });
        }
    });

    getInvoke(constants.URLS.GETUNCONFIRMEDCONTRACTCOUNT, function (res) {
        if (res.succeeded) {
            if (res.data > 0) {
                $("a.item1 span").show();
            }
        }
    });
});

function loginOut() {
    clearToken();
    window.location.href = 'index.html';
}