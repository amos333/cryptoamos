(function ($) {
    var contentResult;
    console.log("home");
    $("#jq").text($.fn.jquery);
    $("a[data-toggle='tab']").on("show.bs.tab", function (e) {
        if (e.relatedTarget) {
            $($(e.relatedTarget).data("target")).empty();
        }
        var url = $(e.target).attr("href");
        var $tabTarget = $($(e.target).data("target"));
        jQuery.get(url, function (result) {
            $tabTarget.html(result);
        });
        $($(e.relatedTarget).data("target")).removeClass('active');
    });
})(jQuery);