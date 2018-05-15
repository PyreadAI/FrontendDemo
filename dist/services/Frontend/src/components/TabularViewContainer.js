"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Table_1 = require("./Table");
class TabularViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Sites: [],
            SelectSite: {},
            SelectedSite: {}
        };
    }
    componentWillReceiveProps(next) {
        this.setState({
            SelectSite: next.SelectSite,
            Sites: next.Sites,
            SelectedSite: next.SelectedSite
        });
    }
    render() {
        return React.createElement("div", { className: "myContainer" },
            React.createElement("div", { className: "container-bar" },
                React.createElement("h5", { className: "title" }, "Sites")),
            React.createElement("div", { className: "container-inner" },
                React.createElement(Table_1.Table, { sites: this.state.Sites, SelectSite: this.props.SelectSite, SelectedSite: this.state.SelectedSite, SetLayout: this.props.SetLayout })));
    }
}
exports.TabularViewContainer = TabularViewContainer;
//# sourceMappingURL=TabularViewContainer.js.map