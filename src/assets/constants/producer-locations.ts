export const PRODUCEROFFICES = {
    chartOptions: {
        chart: {
            borderWidth: 1,
            animation: false,
            map: {}
        },
        colorAxis: {
            min: 0,
            stops: [
                [0, '#FFFFFF'],
                [0.0001, '#7CB9E8'],
                [1, '#00308F'],
            ],
        },
        title: { text: '' },
        subtitle: { text: '' },
        legend: { enabled: true },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom',
            },
        },
        plotOptions: {
            series: {
                stickyTracking: false,
            },
        },
        series: [],
    }
};