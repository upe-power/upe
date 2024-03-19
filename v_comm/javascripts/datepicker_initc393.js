$(function () {
    $('.datepicker').datepicker({
        dateFormat     : 'yy/mm/dd',
        changeYear     : true,
        yearRange      : 'c-100:c+100',
        changeMonth    : true
    }).prop('readonly', true);
    $('.ui-datepicker').addClass('notranslate');
});