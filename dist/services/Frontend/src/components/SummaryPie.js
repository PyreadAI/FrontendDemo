"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_chartjs_2_1 = require("react-chartjs-2");
const axios_1 = require("axios");
const options = {};
class SummaryPie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data30: {},
            data60: {},
            data90: {}
        };
    }
    componentWillReceiveProps(next) {
        this.extractData(next.device);
    }
    extractData(device) {
        let that = this;
        if (device.ping_records.length == 0)
            return {};
        var data30, data60, data90;
        let req = 'ajax/monitoring_api.php?type=devicehistory&device=' + this.props.device.device_recid;
        axios_1.default.get(req)
            .then((response) => {
            let backgroundColors = ["rgba(46, 204, 113, 1)", "rgba(231, 76, 60, 1)"];
            data30 = {
                labels: ["up: " + Math.round(response.data.uptime30 * 100) + "%", "down: " + Math.round((1 - response.data.uptime30) * 100) + "%"],
                datasets: [{
                        data: [response.data.uptime30, 1 - response.data.uptime30],
                        backgroundColor: backgroundColors
                    }]
            };
            data60 = {
                labels: ["up: " + (response.data.uptime60 * 100).toFixed(2) + "%", "down: " + ((1 - response.data.uptime60) * 100).toFixed(2) + "%"],
                datasets: [{
                        data: [response.data.uptime60, 1 - response.data.uptime60],
                        backgroundColor: backgroundColors
                    }]
            };
            data90 = {
                labels: ["up: " + Math.round(response.data.uptime90 * 100) + "%", "down: " + Math.round((1 - response.data.uptime90) * 100) + "%"],
                datasets: [{
                        data: [response.data.uptime90, 1 - response.data.uptime90],
                        backgroundColor: backgroundColors
                    }]
            };
            this.setState({
                data30: data30, data60: data60, data90: data90
            });
        })
            .catch((err) => {
            // alert("Could not get history \n" + err);
        });
    }
    componentDidMount() {
        //hack to give chart time to mount then set its id;
        //should really fork the reactchart library and add id as a prop
        setTimeout(() => {
            let id = "m8spiechart" + this.props.hackID;
            this.refs["chart" + this.props.hackID].chart_instance.canvas.id = id;
        }, 2000);
    }
    render() {
        let ref = "chart" + this.props.hackID;
        let data, time;
        if (this.props.hackID % 3 == 0) {
            data = this.state.data30;
            time = "last 30 days";
        }
        else if (this.props.hackID % 3 == 1) {
            data = this.state.data60;
            time = "between 30 and 60 days ago";
        }
        else {
            data = this.state.data90;
            time = "between 60 and 90 days ago";
        }
        return (React.createElement("div", { className: "pie-container" },
            React.createElement("p", { style: { fontSize: "0.7em", margin: "0px", textAlign: "center" } }, time),
            React.createElement(react_chartjs_2_1.Doughnut, { ref: ref, data: data })));
    }
}
exports.SummaryPie = SummaryPie;
//# sourceMappingURL=SummaryPie.js.map