

(function ($) {

    function getDataForCoin(symbol) {
        $.getJSON("https://api.coingecko.com/api/v3/coins/" + symbol, function (data) {
            console.log("sadsda");
        });
    };


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

    $.getJSON("https://api.coingecko.com/api/v3/coins/list", function (data) {
        var items = [];
        data = data.slice(0, 10);
        $.each(data, function (key, val) {
            $("#home").append(
                '<div class="card float-left" style="">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + val.symbol + '</h5>' +
                '<h6 class="card-subtitle mb-2 text-muted">' + val.name + '</h6>' +
                //'<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>' +
                //'<a href="#" class="card-link">Card link</a>' +
                //'<a href="#" class="card-link">Another link</a>' +
                '<button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#' + val.symbol + '">More Info</button>' +
                '<div id="' + val.symbol + '" class="collapse">' +
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit,' +
                '</div>' +
                '</div >' +
                '</div >');

                $('#' +val.symbol).on('shown.bs.collapse', function() {
                    console.log("shown");
                  }).on('show.bs.collapse', function() {
                    console.log("show");
                  });
        });
    });
})(jQuery);