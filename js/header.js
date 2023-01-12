function header(){
    $.ajax({
        url: "header.html",
        cache: false,
        success: function(header){
            $("header").html(header);
        }
    });
}