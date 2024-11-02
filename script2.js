


data_pompa1     =  firebase.database().ref('pompa1');
data_pompa2     =  firebase.database().ref('pompa2');
data_sensorph   =  firebase.database().ref('ph');
data_sensordht  =  firebase.database().ref('dht');
data_sensortds  =  firebase.database().ref('tds');



var slider      = document.getElementById("myRange");
var output      = document.getElementById("demo");
var slider2     = document.getElementById("myRange2");
var output2     = document.getElementById("demo2");
output.innerHTML    = slider.value;
output2.innerHTML   = slider2.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  firebase.database().ref().update({
    'pompa1' : parseInt(this.value)
});
}

slider2.oninput = function() {
  output2.innerHTML = this.value;
  firebase.database().ref().update({
    'pompa2' : parseInt(this.value)
});
}


data_pompa1.on("value", function(snapshot) { document.getElementById('data_pompa1').innerHTML=snapshot.val();});
data_pompa2.on("value", function(snapshot) { document.getElementById('data_pompa2').innerHTML=snapshot.val();});
data_sensorph.on("value", function(snapshot) { document.getElementById('data_sensorph').innerHTML=snapshot.val();});
data_sensordht.on("value", function(snapshot) { document.getElementById('data_sensordht').innerHTML=snapshot.val();});
data_sensortds.on("value", function(snapshot) { document.getElementById('data_sensortds').innerHTML=snapshot.val();});


Highcharts.stockChart('container1', {
    chart: {
        //backgroundColor: 'transparent',
       // type: 'line',
        // type: 'areaspline',
        
         type: 'spline',
        events: {
            load: function () {

                // set up the updating of the chart each second
                const series = this.series[0];
                setInterval(function () {
                        data_sensorph.on("value", function(snapshot) {
                        const x = (new Date()).getTime(), // current time
                        y= snapshot.val()
                        series.addPoint([x, y], true, true);
                });
                }, 1000);
            }
        }
    },

    accessibility: {
        enabled: false
    },

    time: {
        useUTC: false
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Sensor PH'
    },

    exporting: {
        enabled: true
    },

    series: [{
        name: 'PH',
        data: (function () {
            // generate an array of random data
            const data = [],
                time = (new Date()).getTime();

            for (let i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,0
                   // Math.round(Math.random() * 100)
                
                ]);
            }
            return data;
        }())
    }]
});


Highcharts.stockChart('container2', {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                const series = this.series[0];
                setInterval(function () {
                    data_sensordht.on("value", function(snapshot) {
                    const x = (new Date()).getTime(), // current time
                    y= snapshot.val()
                series.addPoint([x, y], true, true);
            });
            },1000);
            }
        }
    },

    accessibility: {
        enabled: false
    },

    time: {
        useUTC: false
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Sensor DHT'
    },

    exporting: {
        enabled: true
    },
   
    series: [{
        name: 'DHT',
        data: (function () {
            // generate an array of random data
            const data = [],
                time = (new Date()).getTime();
            
            for (let i = -999; i <= 0; i += 1) {
               
                
               
                data.push([
                    time + i * 1000,
                    0
                   // Math.round(Math.random() * 100)
                  
                ]);
           
            }
            return data;
        }
        
        
        ())
    }]
});

Highcharts.stockChart('container3', {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                const series = this.series[0];
                setInterval(function () {
                    data_sensortds.on("value", function(snapshot) {
                    const x = (new Date()).getTime(), // current time
                    y= snapshot.val()
                series.addPoint([x, y], true, true);
            });
            },1000);
            }
        }
    },

    accessibility: {
        enabled: false
    },

    time: {
        useUTC: false
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Sensor TDS'
    },

    exporting: {
        enabled: true
    },
   
    series: [{
        name: 'TDS',
        data: (function () {
            // generate an array of random data
            const data = [],
                time = (new Date()).getTime();
            
            for (let i = -999; i <= 0; i += 1) {
               
                
               
                data.push([
                    time + i * 1000,
                    0
                   // Math.round(Math.random() * 100)
                  
                ]);
           
            }
            return data;
        }
        
        
        ())
    }]
});
