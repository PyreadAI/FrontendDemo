"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const IconButton_1 = require("material-ui/IconButton");
const Assessment_1 = require("material-ui-icons/Assessment");
// 
class ReportIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SiteID: 0
        };
    }
    componentWillReceiveProps(next) {
        this.setState({ SiteID: next.SiteID });
    }
    openReportWindow(e) {
        e.preventDefault();
        this.props.SelectSite(this.state.SiteID);
        this.props.SetLayout("report");
    }
    render() {
        return (React.createElement(IconButton_1.default, { onClick: this.openReportWindow.bind(this) },
            React.createElement(Assessment_1.default, { className: "report-icon" })));
    }
}
exports.ReportIcon = ReportIcon;
//# sourceMappingURL=ReportIcon.js.map