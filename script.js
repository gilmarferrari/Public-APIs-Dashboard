function copyLink() {
    navigator.clipboard.writeText('gilmarferrari.github.io/Dashboard/');
    window.alert('Link copiado com sucesso!');
}

$.when(
    $.getJSON('https://economia.awesomeapi.com.br/json/daily/USD-BRL/15'),
    $.getJSON('https://economia.awesomeapi.com.br/json/all')
).done(function(USD, others) {
    console.log([USD, others]);
    loadCharts(USD[0].reverse(), others[0]);
});

function loadCharts(USD, others) {
    var low = Object.keys(USD).map(i => Number.parseFloat(USD[i].low));
    var high = Object.keys(USD).map(i => Number.parseFloat(USD[i].high));
    var period = Object.keys(USD).map(i => new Date(USD[i].timestamp * 1000).toLocaleDateString('pt-BR'));
    var variation = Object.keys(USD).map(i => Number.parseFloat(USD[i].pctChange));
    var coins = Object.keys(others).map(i => others[i].code);
    var coinsLow = Object.keys(others).map(i => others[i].low);

    new Chart("overview", {
        type: "line",
        data: {
            labels: period,
            datasets: [{
                borderColor: "#c6df9f",
                data: low
            },
            {
                borderColor: "#7fa1e0",
                data: high
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });

    new Chart("variation", {
        type: "line",
        data: {
            labels: period,
            datasets: [{
                borderColor: "#c6df9f",
                data: variation
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                xAxes: [{
                    display: false
                }]
            }
        }
    });

    new Chart("other-coins", {
        type: "bar",
        data: {
            labels: coins,
            datasets: [{
                backgroundColor: "#c6df9f",
                data: coinsLow
            }]
        },
        options: {
            legend: { display: false }
        }
    });
}