const fs = require('fs');
const timeseries = require('timeseries-analysis');

function predict() {

   setInterval(function(){
    const data = fs.readFileSync('static/pk_model/data.csv', 'utf8');
    const dataArray = data.split('\n').map(row => {
        const [date, value, ds] = row.split(',');
        const [year, month, day] = ds.split('-').map(Number);
        return {
          value: parseFloat(value),
          ds: new Date(year, month - 1, day).toISOString().substring(0, 10)
        };
    });

    const t = new timeseries.main(timeseries.adapter.fromDB(dataArray, {date: 'ds',value: 'value'}));
    const forecast = t.sliding_regression_forecast({sample:12, degree: 5});
    let [date , value] = forecast.buffer[forecast.buffer.length - 1];
    date = new Date(date);
    date.setDate(date.getDate() + 1);

    const object =  {
        date: new Date(date).toISOString().substring(0, 10),
        value: value.toFixed(1),
        ds: new Date(date).toISOString().substring(0, 10)
    };
    fs.appendFileSync('static/pk_model/data.csv', `\n${object.date},${object.value},${object.ds}`);
   },5000)
}

module.exports = {
    predict
}