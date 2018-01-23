/**
 * Created by long.jiang on 2016/9/1.
 */
var constants = {
    URLS: {
        BILL: "bill.html",
        WEBPAYURL: "http://test.fengniaowu.com/webpay.html?orderId={0}",
        //
        SEND: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/ValidateCode/Send",
        VERIFY: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/ValidateCode/Verify",
        TENANT: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Register/Tenant",
        LOGINBYPASSWORD: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/PasswordLogin/Tenant/Login",
        LOGINAUTHCODE: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/ValidateCodeLogin/Tenant/Login",
        QUICKLOGIN: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/ValidateCodeLogin/Tenant/QuickLogin",
        SETPASSWORD: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Password/Set",
        GETCURRENTTENANT: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/GetCurrentTenant",
        TWOFACTORVERIFY: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/TwoFactorVerify",
        UPLOADTENANTINFO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/UploadTenantInfo",
        CONFIRMTENANTINFO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/ConfirmTenantInfo",
        UPDATETENANTPHOTO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/UpdateTenantPhoto",
        //
        SIGNATURE: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/FileController/Signature?url={0}",
        UPLOADIMAGESWEIXIN: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/FileController/UploadImagesWeiXin",
        UPLOADIMAGESQR: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/FileController/UploadImagesQR",
        //
        GETUNCONFIRMEDCONTRACTCOUNT: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/GetUnConfirmedContractCount",
        GETCURRENTCONTRACTS: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/GetCurrentContracts",
        GETCONTRACTDETAILS: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/GetContractDetails?contractId={0}",
        TENANTVALIDATECODEVERIFY: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/TenantValidateCodeVerify",
        CREATECONFIRMINFO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/CreateConfirmInfo",
        UPLOADPICTURES: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/UploadPictures",
        UPDATECONTACTINFO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/UpdateContactInfo",
        GETCONTRACTCONFIRMINFO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/GetContractConfirmInfo?contractConfirmInfoId={0}",
        CONFIRMCONTRACT: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/ConfirmContract",
        GETCONFIRMCONTRACTRESULT: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/GetConfirmContractResult?confirmContractProcessId={0}",
        CREATECHECKOUTAPPLY: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/CreateCheckoutApply",
        CANCELCHECKOUTAPPLY: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Contract/CancelCheckoutApply",
        //
        QUERYALLORDERS: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Order/QueryAllOrders?orderState={0}",
        CREATEYUEFUORDERS: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Order/CreateYueFuOrders",
        //
        GETORDERBYORDERID: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Order/GetOrderByOrderId?orderId={0}",
        CREATETRANSACTION: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Transaction/CreateTransaction",
        GETTRANSACTION: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Transaction/GetTransaction?transactionId={0}",
        GETWECHATOPENID: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Payment/GetWeChatOpenId",
        ORDERPAYMENT: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Payment/OrderPayment",
        GETTENANTCREDITINFO: "http://kc-fengniaowu-talos.dev.kolibre.credit/api/Tenant/GetTenantCreditInfo"
    },
    COOKIES: {
        XKCSID: 'X-KC-SID',
        TAG: 'X-KC-TAG',
        CONTRACTCONFIRMINFOID: "X-KC-CONTRACTCONFIRMINFOID"
    },
    REGEX: {
        CELLPHONE: /^(13|14|15|16|17|18|19|10)\d{9}$/,
        PASSWORD: /^[a-zA-Z\d~!@#$%^&*_]{6,18}$/,
        PAYMENT_PASSWORD: /^(?![^a-zA-Z~!@#$%^&*_]+$)(?!\D+$).{8,18}$/,
        URL: /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[:?\d]*)\S*$/,
        CREDENTIALNO: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
        BANKCARDNO: /^\d{15,19}$/,
        CHECKCODE: /^\d{6}$/,
        FLOOR: /^\d{1,5}$/,
        AMOUNT: /^\d{1,7}(\.\d{1,2})?$/
    },
    msgInfo: {
        postData: "数据正在提交请稍后",
        error: "系统服务繁忙，请稍后",
        error1: "系统服务繁忙，请稍后！",
        phone: '手机号码不能为空',
        phoneerr: '手机号码格式错误',
        send: '发送成功',
        senderr: '发送失败',
        captcha: '验证码不能为空',
        captchaerr: '验证码格式错误',
        password: '密码不能为空',
        passworderr: '密码格式错误',
        passwordsame: '密码不一致,重新输入',
        register: '注册成功',
        registererr: '注册失败',
        agreement1: '请同意蜂鸟屋注册服务协议',
        agreement2: '请同意蜂鸟屋服务协议',
        agreement3: '请同意蜂鸟屋租房分期服务协议',
        loginSuccess: '登录成功',
        loginErr1: '密码错误',
        loginErr2: '用户未设置登录密码',
        loginErr3: '用户被锁定',
        loginErr4: '用户未注册',
        tokenerr: '请点击发送验证码',
        credentialType: "请选择证件类型",
        realName: "姓名不能为空",
        credentialNo: "证件号码不能为空",
        credentialNoerr: "证件号码格式错误",
        img10err: "身份证正面不能为空",
        img20err: "身份证背面不能为空",
        img11err: "护照个人信息页不能为空",
        img21err: "护照签证信息页不能为空",
        img3err: "手持证件不能为空",
        verify: "{0}提交成功",
        verifyerr: "请提交个人身份信息",
        uploaderr: "身份证上传失败",
        resetPassword: "密码重置成功",
        resetPassworderr: "密码重置失败",
        source: "房屋来源不能为空",
        source1: "请选择具体楼号标签",
        source2: "请选择手机号所属",
        roomNumber: "房号不能为空",
        roomNumber2: "请选择房号",
        floor: "楼层不能为空",
        floorerr: "楼层格式错误",
        floor2: "请选择楼层",
        decoration: "朝向不能为空",
        leaseInfo: "租约信息提交成功",
        outerContractNo: "合同编号不能为空",
        outerContractNoerr: "合同编号格式错误",
        monthRentalAmount: "月租金不能为空",
        monthRentalAmounterr: "月租金格式错误",
        leaseTerm: "剩余月数不能为空",
        leaseTermerr: "剩余月数格式错误",
        leaseTermerr2: "剩余月数是1-12的数字",
        leaseOrderDay: "每期付款日不能为空",
        leaseOrderDayerr: "每期付款日格式错误",
        leaseOrderDayRang: "输入1~31的数字",
        leaseExpiryTime: "合同结束日期错误",
        depositAmount: "押金不能为空",
        depositAmounterr: "押金格式错误",
        tenementAmounterr: "物业费格式错误",
        imgContracterr: "租房合同第{0}页不能为空",
        imgContracterr2: "租房合同不能为空",
        imgIDCarderr: "本人手持身份证照片为空",
        imgContract: "租房合同上传成功",
        imgIDCard: "身份证自拍照上传成功",
        linkRealName: "联系人姓名为空",
        linkCellphone: "联系人手机号为空",
        linkRelationship: "联系人关系为空",
        contactInfo: "联系人提交成功",
        rentalTypeerr: "付款方式不能为空",
        accountCellphone: "联系人手机号不能为{0}",
        accountName: "联系人不能为{0}"
    },
    CONFIGS: {
        APPID: "wxa74d300625108685"
    }
};
var COMMONPATH = {
    PAGE: {
        LOGIN: 'login.html?url=##rurl##'
    }
};