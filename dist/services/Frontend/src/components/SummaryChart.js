"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_chartjs_2_1 = require("react-chartjs-2");
const axios_1 = require("axios");
const moment = require("moment");
const myFormat = 'YYYY-MM-DD[T]HH:mm';
const options = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "response (ms)"
                },
                gridLines: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
                }
            }],
        xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "time"
                },
                gridLines: {
                    display: false
                }
            }]
    },
    animation: {
        duration: 0
    }
};
const colors = [
    "rgba(220, 57, 18, 0.5)",
    "rgba(220, 57, 18, 1)",
    "rgba(51, 102, 204, 0.5)",
    "rgba(51, 102, 204, 1)",
    "rgba(255, 153, 0, 0.5)",
    "rgba(255, 153, 0, 1)",
    "rgba(16, 150, 24, 0.5)",
    "rgba(16, 150, 24, 1)",
    "rgba(153, 0, 153, 0.5)",
    "rgba(153, 0, 153, 1)",
    "rgba(59, 62, 172, 0.5)",
    "rgba(59, 62, 172, 1)"
];
const maxPoints = 100;
class SummaryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentWillReceiveProps(next) {
        this.extractData(next.Site, next.FromDate, next.ToDate);
    }
    extractData(site, fromDate, toDate) {
        let that = this;
        if (!site.devices || site.devices.length == 0 || site.devices[0].ping_records.length == 0)
            return {};
        var data = {
            labels: [],
            datasets: []
        };
        let dataPromises = [];
        let startdate = moment(fromDate, myFormat).utc().format();
        let enddate = moment(toDate, myFormat).utc().format();
        for (let j = 0; j < site.devices.length; j++) {
            var device = site.devices[j];
            let req = '/ajax/monitoring_api.php?type=device&device=' + device.device_recid + '&startdate=' + startdate + '&enddate=' + enddate;
            dataPromises.push(axios_1.default.get(req));
        }
        Promise.all(dataPromises)
            .then((responses) => {
            let devices = [];
            for (let res of responses) {
                devices.push(res.data);
            }
            for (let j = 0; j < devices.length; j++) {
                device = devices[j];
                data.datasets.push({
                    data: [],
                    label: device.description,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: colors[(2 * j) % colors.length],
                    hoverBorderColor: colors[(2 * j + 1) % colors.length],
                    borderWidth: 2,
                    pointRadius: [],
                    pointStyle: [],
                    pointBorderColor: [],
                    pointHoverRadius: 6
                });
                let interval = 1;
                if (device.ping_records.length > maxPoints)
                    interval = Math.floor(device.ping_records.length / maxPoints);
                let count = 0, average = 0;
                for (let i = 0; i < device.ping_records.length; i++) {
                    let curRecord = device.ping_records[i];
                    var date = moment.utc(curRecord.datetime);
                    var dateString = date.local().format('D[/]M[-]HH[:]mm');
                    if (curRecord.responded) {
                        if (i % interval != 0) {
                            average += curRecord.ms_response;
                            count++;
                        }
                        else {
                            average += curRecord.ms_response;
                            count++;
                            average /= count;
                            if (j == 0)
                                data.labels.push(dateString);
                            data.datasets[j].data.push(average);
                            data.datasets[j].pointRadius.push(4);
                            data.datasets[j].pointStyle.push('circle');
                            data.datasets[j].pointBorderColor.push(colors[(2 * j + 1) % colors.length]);
                            count = 0;
                            average = 0;
                        }
                    }
                    else {
                        data.datasets[j].data.push(0);
                        data.datasets[j].pointRadius.push(6);
                        data.datasets[j].pointStyle.push('crossRot');
                        data.datasets[j].pointBorderColor.push("rgba(255,0,0,1)");
                        if (j == 0)
                            data.labels.push(dateString);
                    }
                }
            }
            that.setState({ Data: data });
        })
            .catch((err) => {
            alert("Error in parsing data for summary chart\n" + err);
        });
    }
    componentDidMount() {
        //hack to give chart time to mount then set its id;
        //should really fork the reactchart library and add id as a prop
        setTimeout(() => {
            this.refs.chart.chart_instance.canvas.id = "m8slinechart";
        }, 2000);
    }
    render() {
        return (React.createElement("div", { id: "chartcontainer" },
            React.createElement(react_chartjs_2_1.Line, { data: this.state.
                    Data, ref: "chart", options: options, redraw: true })));
    }
}
exports.SummaryChart = SummaryChart;
//# sourceMappingURL=SummaryChart.js.map