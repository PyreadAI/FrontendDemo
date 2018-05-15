"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const IconButton_1 = require("material-ui/IconButton");
const Close_1 = require("material-ui-icons/Close");
const PresentationalReport_1 = require("./PresentationalReport");
class ReportContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", { className: "myContainer" },
            React.createElement("div", { className: "container-bar" },
                React.createElement("h5", { className: "title" }, "Report"),
                React.createElement(IconButton_1.default, { onClick: this.props.SetLayout.bind(this, "default"), className: "bar-button", style: { height: "20%", top: "-25px" } },
                    React.createElement(Close_1.default, { style: { color: "white" } }))),
            React.createElement("div", { className: "container-inner" },
                React.createElement(PresentationalReport_1.PresentationalReport, { SelectedSite: this.props.SelectedSite })));
    }
}
exports.ReportContainer = ReportContainer;
//# sourceMappingURL=ReportContainer.js.map