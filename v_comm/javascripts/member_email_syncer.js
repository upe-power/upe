jQuery(function ($) {
    var $username = $('[name="account1"]');
    var $email    = $('[name="person6"]');
    var currentUsernameIsEmail = $('body').hasClass('current_username_is_email');
    
    if ($email.length > 0) {
        if ($username.length > 0) {
            var username = $username.val();
            if (username === '' || utils.isEmail(username)) {
                $username.on('input propertychange', function () {
                    $email.val($(this).val());
                });
                $email.prop('readonly', true)
                      .css('background-color', '#d3d5da')
                      .removeAttr('onblur');
            }
        } else if (currentUsernameIsEmail) {
            $email.prop('readonly', true)
                  .css('background-color', '#d3d5da')
                  .removeAttr('onblur');
        }
    }
});