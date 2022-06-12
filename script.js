function copyLink() {
    navigator.clipboard.writeText('gilmarferrari.github.io/Dashboard/');
    window.alert('Link copiado com sucesso!');
}

$.when(
    $.getJSON('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/30?formato=json'),
    $.getJSON('https://api.bcb.gov.br/dados/serie/bcdata.sgs.16121/dados/ultimos/12?formato=json'),
).done(function (USD, others) {
    loadCharts(USD[0], others[0]);
});

function loadCharts(USD, others) {
    var amount = USD.map(i => i.valor);
    var USDperiod = USD.map(i => i.data);
    var IPCA = others.map(i => (i.valor * 10).toFixed(2));
    var IPCAperiod = others.map(i => i.data);
    var variation = [];
    for (let i = 0; i < USD?.length; i++) {
        variation.push({ x: i + 1, y: (USD[i]?.valor ?? 1) / (USD[i - 1]?.valor ?? USD[i]?.valor) });
    }

    new Chart("overview", {
        type: "line",
        data: {
            labels: USDperiod,
            datasets: [{
                borderColor: "#c6df9f",
                data: amount
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
        type: "scatter",
        data: {
            datasets: [{
                backgroundColor: "#c6df9f",
                data: variation
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });

    new Chart("ipca", {
        type: "bar",
        data: {
            labels: IPCAperiod,
            datasets: [{
                backgroundColor: "#c6df9f",
                data: IPCA
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
}
