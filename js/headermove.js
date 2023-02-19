$(function() {
    var headerHeight = $('#header').outerHeight(),
        startPos = 0;
    $(window).on('load scroll', function() {
        var scrollPos = $(this).scrollTop();
        if (scrollPos > startPos && scrollPos > headerHeight) {
            $('#header').removeClass('DownMove'); //#headerにDownMoveというクラス名を除き
            $('#header').addClass('UpMove'); //#headerにUpMoveのクラス名を追加
        } else {
            $('#header').removeClass('UpMove'); //#headerにUpMoveというクラス名を除き
            $('#header').addClass('DownMove'); //#headerにDownMoveのクラス名を追加
        }
        startPos = scrollPos;
    });
});