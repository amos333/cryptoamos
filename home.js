function createHome() {

    localStorage.setItem("cryptoList", "");

    $.getJSON("https://api.coingecko.com/api/v3/coins/list", function(data) {
        $("#home_content").empty();
        $("#home_content").append('<input class="form-control col-2" type="text" placeholder="Search" aria-label="Search" id="searchInCards">');

        var items = [];
        data = data.slice(50, 80);

        $.each(data, function(key, val) {
            $("#home_content").append(
                '<div class="card float-left col-lg-4" style="">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + val.symbol +
                '<label class="switch right">' +
                '<input id="toggler' + val.symbol + '" type="checkbox">' +
                '<span class="slider round"></span>' +
                '</label>' +
                '</h5>' +
                '<h6 class="card-subtitle mb-2 text-muted">' + val.name + '</h6>' +
                '<button id="moreInfo' + val.symbol + '" type="button" class="btn btn-primary" data-toggle="collapse" data-target="#' + val.symbol + '">More Info</button>' +
                '<div id="' + val.symbol + '" class="collapse">' + '</div>' +
                '</div >' +
                '</div >');
        });

        $.each(data, function(key, val) {
            $('#toggler' + val.symbol).change(function() {
                let cryptoData = localStorage.getItem("cryptoList");
                if (this.checked) {

                    let cryptoDataArray = cryptoData.split(',');
                    if (cryptoDataArray.length - 1 === 5) {
                        createCoinsList();

                        $('#toggler' + val.symbol).prop('checked', false);
                    } else {
                        localStorage.setItem("cryptoList", val.symbol + "," + cryptoData);
                    }

                } else {
                    cryptoData = cryptoData.replace(val.symbol + ',', '');
                    localStorage.setItem("cryptoList", cryptoData);
                }

            });
        });

        $.each(data, function(key, val) {
            $('#moreInfo' + val.symbol).on('click', function() {

                $('#' + val.symbol).append(
                    '<div id="prog' + val.symbol + '" class="progress">' +
                    '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>' +
                    '</div>'
                );


                $.getJSON("https://api.coingecko.com/api/v3/coins/" + val.id, function(data) {
                    $('#' + val.symbol).text("");
                    $('#' + val.symbol).append(
                        "<div>USD: " + data.market_data.current_price.usd + "</div>" +
                        "<div>EUR: " + data.market_data.current_price.eur + "</div>" +
                        "<div>ILS: " + data.market_data.current_price.ils + "</div>" +
                        "<img src='" + data.image.small + "'>"
                    );
                });

            });
        });

        $('#searchInCards').keyup(function() {
            $('.card').removeClass('d-none');
            var filter = $(this).val(); // get the value of the input, which we filter on
            $('#home_content').find('.card .card-body h5:not(:contains("' + filter + '"))').parent().parent().addClass('d-none');
        })
    });
};

function createCoinsList() {
    let coinsList = localStorage.getItem("cryptoList").split(',');
    coinsList.pop();
    $("#modal-body").html("");

    $.each(coinsList, function(key, val) {
        $("#modal-body").append(
            '<label class="switch">' +
            '<input id="modaltoggler' + val + '" type="checkbox" checked>' +
            '<span class="slider round"></span>' +
            '</label>' +
            val +
            '<br/>'
        );

        $('#modaltoggler' + val).change(function() {
            var attr = $('#modaltoggler' + val).attr('checked');
            if (typeof attr !== typeof undefined && attr !== false) {

                $('#toggler' + val).removeAttr("checked", "");
            } else {

                $('#toggler' + val).attr("checked");
            }
        });
    });

    $('#modal').modal('show');
}

$('#modal-save-button').on('click', function() {
    cryptoDataFromModal = "";

    for (var i = 0; i < $('#modal-body').children().length / 2; i++) {
        if ($($($('#modal-body').children()[i * 2]).children()[0]).is(':checked')) {
            cryptoDataFromModal = cryptoDataFromModal +
                $($($('#modal-body').children()[i * 2]).children()[0]).attr('id').replace('modaltoggler', '') +
                ",";
        }
    }

    localStorage.setItem("cryptoList", cryptoDataFromModal);

    $('#modal').modal('hide');
});