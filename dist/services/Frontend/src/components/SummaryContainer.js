"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SummaryChart_1 = require("./SummaryChart");
const moment = require("moment");
const myFormat = 'YYYY-MM-DD[T]HH:mm';
class SummaryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Site: {},
            FromDate: '',
            ToDate: ''
        };
    }
    componentWillReceiveProps(next) {
        let now = moment();
        let from = moment().subtract(1, 'days');
        let changedTo = true, changedFrom = true;
        if (moment(this.state.ToDate, myFormat).isBefore(moment().subtract(3, 'minutes'))) {
            changedTo = false;
            now = moment(this.state.ToDate, myFormat);
        }
        if (moment(this.state.FromDate, myFormat).isBefore(moment().subtract(1, 'days').subtract(3, 'minutes')) || moment(this.state.FromDate, myFormat).isAfter(moment().subtract(1, 'days').add(1, 'minutes'))) {
            changedFrom = false;
            from = moment(this.state.FromDate, myFormat);
        }
        if (next.Site && next.Site.devices && next.Site.devices.length > 0) {
            if (changedFrom || changedTo) {
                this.setState({ Site: next.Site, FromDate: from.format(myFormat), ToDate: now.format(myFormat) });
            }
            else {
                this.setState({ Site: next.Site });
            }
        }
        else {
            if (changedFrom || changedTo) {
                this.setState({ FromDate: from.format(myFormat), ToDate: now.format(myFormat) });
            }
        }
    }
    fromDateChange(event) {
        let date = moment(event.target.value, myFormat);
        if (date.isAfter(moment()) || date.isAfter(this.state.ToDate)) {
            alert("Invalid date: From date must be before to date and current date");
        }
        else {
            this.setState({ FromDate: event.target.value });
        }
    }
    toDateChange(event) {
        let date = moment(event.target.value, myFormat);
        if (date.isAfter(moment()) || date.isBefore(this.state.FromDate)) {
            alert("Invalid date: To date must be after from date and before current date");
        }
        else {
            this.setState({ ToDate: event.target.value });
        }
    }
    render() {
        var style = {};
        var title = (React.createElement("h5", { className: "title", style: style }, "Summary"));
        if (this.state.Site && this.state.Site.devices && this.state.Site.devices.length > 0 && this.state.Site.devices[0].ping_records.length > 0) {
            style = { float: "left", paddingTop: "0px", paddingRight: "20px" };
            title = (React.createElement("div", { className: "summary-title" },
                React.createElement("h5", { className: "title", style: style }, this.state.Site.description)));
        }
        let toDate = new Date();
        return React.createElement("div", { className: "myContainer" },
            React.createElement("div", { className: "container-bar" },
                title,
                React.createElement("form", { className: "date-field no-drag", noValidate: true },
                    React.createElement("p", null, "To"),
                    React.createElement("input", { className: "datetime-input", type: "datetime-local", value: this.state.ToDate, style: { color: "white" }, onChange: this.toDateChange.bind(this) })),
                React.createElement("form", { className: "date-field no-drag", noValidate: true },
                    React.createElement("p", null, "From"),
                    React.createElement("input", { className: "datetime-input", type: "datetime-local", value: this.state.FromDate, style: { color: "white" }, onChange: this.fromDateChange.bind(this) }))),
            React.createElement("div", { className: "container-inner" },
                React.createElement(SummaryChart_1.SummaryChart, { Site: this.state.Site, FromDate: this.state.FromDate, ToDate: this.state.ToDate })));
    }
}
exports.SummaryContainer = SummaryContainer;
//# sourceMappingURL=SummaryContainer.js.map