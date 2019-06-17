var refreshIntervalId;

function createReport() {

    let coinslst = localStorage.getItem('cryptoList');
    if (coinslst === "") {
        return;
    }

    clearInterval(refreshIntervalId);
    var options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "AmosCrypto Coins Graph"
        },
        subtitles: [{
            text: ""
        }],
        axisX: {
            title: "Date",
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            title: "Price",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [
            /* {
                 type: "spline",
                 name: "Units Sold",
                 showInLegend: true,
                 xValueFormatString: "MMM YYYY",
                 yValueFormatString: "#,##0 Units",
                 dataPoints: [
                     { x: new Date(2016, 0, 1), y: 120 },
                     { x: new Date(2016, 1, 1), y: 135 },
                     { x: new Date(2016, 2, 1), y: 144 },
                     { x: new Date(2016, 3, 1), y: 103 },
                     { x: new Date(2016, 4, 1), y: 93 },
                     { x: new Date(2016, 5, 1), y: 129 },
                     { x: new Date(2016, 6, 1), y: 143 },
                     { x: new Date(2016, 7, 1), y: 156 },
                     { x: new Date(2016, 8, 1), y: 122 },
                     { x: new Date(2016, 9, 1), y: 106 },
                     { x: new Date(2016, 10, 1), y: 137 },
                     { x: new Date(2016, 11, 1), y: 142 }
                 ]
             },
             {
                 type: "spline",
                 name: "Profit",
                 axisYType: "secondary",
                 showInLegend: true,
                 xValueFormatString: "MMM YYYY",
                 yValueFormatString: "$#,##0.#",
                 dataPoints: [
                     { x: new Date(2016, 0, 1), y: 19034.5 },
                     { x: new Date(2016, 1, 1), y: 20015 },
                     { x: new Date(2016, 2, 1), y: 27342 },
                     { x: new Date(2016, 3, 1), y: 20088 },
                     { x: new Date(2016, 4, 1), y: 20234 },
                     { x: new Date(2016, 5, 1), y: 29034 },
                     { x: new Date(2016, 6, 1), y: 30487 },
                     { x: new Date(2016, 7, 1), y: 32523 },
                     { x: new Date(2016, 8, 1), y: 20234 },
                     { x: new Date(2016, 9, 1), y: 27234 },
                     { x: new Date(2016, 10, 1), y: 33548 },
                     { x: new Date(2016, 11, 1), y: 32534 }
                 ]
             }*/
        ]
    };

    var chart;

    $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + coinslst.slice(0, -1).toUpperCase() + "&tsyms=USD" /*data.substring(0, data.length - 1)*/ , function(data) {


        if (data.Response != "Error") {
            var dataarr = Object.keys(data).map(key => ({ "Name": key, "Price": data[key].USD }));

            dataarr.forEach(element => {

                options.data.push({
                    type: "spline",
                    name: element.Name,
                    showInLegend: true,
                    xValueFormatString: "HH:mm:ss",
                    //yValueFormatString: "#,##0 Units",
                    dataPoints: [
                        { x: new Date(), y: element.Price },
                    ]
                });
            });

            chart = new CanvasJS.Chart("chartContainer", options);
            chart.render();

            if (options.data != []) {
                refreshIntervalId = setInterval(function() {
                    $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + coinslst.slice(0, -1).toUpperCase() + "&tsyms=USD" /*data.substring(0, data.length - 1)*/ , function(data) {

                        if (data.Response != "Error") {
                            var dataarr = Object.keys(data).map(key => ({ "Name": key, "Price": data[key].USD }));

                            dataarr.forEach((element, i) => {
                                options.data[i].dataPoints.push({ x: new Date(), y: element.Price });
                                console.log(options.data[i].dataPoints);
                            });

                            chart.render();
                        }
                    });
                }, 2000);
            }
        }
    });

    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

}