/**
 * Created by long.jiang on 2017/3/16.
 */

function uesr() {
    window.location.href = "user.html";
}

function list() {
    window.location.href = "list.html";
}

$(document).ready(function () {
    getInvoke2(constants.URLS.GETUNCONFIRMEDCONTRACTCOUNT, function (res) {
        if (res.succeeded) {
            if (res.data > 0) {
                $("#lbUnConfirmedContractCount").show();
            }
        }
    });
});
