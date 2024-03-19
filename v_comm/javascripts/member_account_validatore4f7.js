function CheckUsernameIfExist(tempFiled, tempAccount, customerID, languageID, returnStr, Exception, emptyAccountReturnStr) {
    $.ajax({
        type: "POST",
        url: "../../comm/inc/InspectAccount.asp",
        data: {
            Account: tempAccount,
            customerID: customerID,
            languageID: languageID,
            returnStr: returnStr,
            Exception: Exception,
			emptyAccountReturnStr: emptyAccountReturnStr
        },
        success: function(msg) {
            if (msg != "") {
                $(tempFiled).html(msg);
                FormFinish = false;
            } else {
                $(tempFiled).html(msg);
                FormFinish = true;
            }
        }
    });
}