var chartData;

$(function(){
    $.ajax({

        url: 'http://localhost:5000/fuelPrices',
        type: 'GET',
        success : function(data) {
            chartData = data;
            var template = Handlebars.compile($("#tabular-template").html());
            $("#table-location").html(template(data));

            var chartProperties = {
                "caption": "Situazione bancaria",
                "numberprefix": "€",
                "xAxisName": "Mese",
                "yAxisName": "Importo"
            };

            var categoriesArray = [{
                "category" : data["categories"]
            }];

            var lineChart = new FusionCharts({
                type: 'msline',
                renderAt: 'chart-location',
                width: '1000',
                height: '600',
                dataFormat: 'json',
                dataSource: {
                    chart: chartProperties,
                    categories : categoriesArray,
                    dataset : data["dataset"]
                }
            });
            lineChart.render();
        }
    });
});
