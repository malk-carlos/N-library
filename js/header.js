function header() {
    $.ajax({
        url: "header.html",
        cache: false,
        success: function (header) {
            $("header").html(header);
        }
    });

    $.ajax({
        url: "footer.html",
        cache: false,
        success: function (footer) {
            $("footer").html(footer);
        }
    });
}