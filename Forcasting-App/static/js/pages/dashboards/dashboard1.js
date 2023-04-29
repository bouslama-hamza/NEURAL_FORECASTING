var options = {
    series: [{
    name: 'Weather',
    data: []
  }],
    chart: {
    height: 350,
    type: 'line',
    colors: ['#008FFB'],
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: []
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    },
  },
  };

var chart = new ApexCharts(document.querySelector("#flot-line-chart"), options);
chart.render();

// each 3 seconds, get the prediction date , read the csv file and update the chart with csv date and prediction date
setInterval(function(){
     read_csv();
     console.log('updated');
}, 5000);

// read the csv file and update the chart with csv date and prediction date
async function read_csv(){
    var csv = new Array();
     $.ajax({
        url: 'pk_model/data.csv',
        type: 'GET',
        dataType: 'text',
        success: function(data){
            csv = data.split('\n');
            var csv_data = new Array();
            for (var i = 0; i < csv.length-1; i++) {
                csv_data.push(csv[i].split(','));
            }
            var csv_date = new Array();
            var csv_sales = new Array();
            for (var i = 0; i < csv_data.length; i++) {
                csv_date.push(csv_data[i][0]);
                csv_sales.push(csv_data[i][1]);
            }
            chart.updateOptions({
                series: [{
                    name: 'Wines',
                    data: csv_sales.slice(csv_date.length-12, csv_date.length)
                  }],
                xaxis: {
                    type: 'datetime',
                    categories: csv_date.slice(csv_date.length-12, csv_date.length)
                },
            });
            data = [];
            if (csv_sales[csv_sales.length-1] > 2){
                $('#wind').html('Snow');
            }else{
                $('#wind').html('Sunny');
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}