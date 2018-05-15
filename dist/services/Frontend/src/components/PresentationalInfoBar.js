"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class InfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            p: React.createElement("p", { id: "clock" }, "--Last Updated: " + this.props.CurrentTime + "--")
        };
    }
    componentWillReceiveProps(next) {
        let p = React.createElement("p", { id: "clock" }, "Last Updated: " + next.CurrentTime);
        this.setState({ p: p });
    }
    render() {
        return React.createElement("div", { id: "info-bar", style: { color: "white", fontSize: "1.5vh", width: "100%", height: "2.5vh", opacity: 0.8, position: "relative" } },
            "Response times from: " + this.props.location,
            this.state.p);
    }
}
exports.InfoBar = InfoBar;
//# sourceMappingURL=PresentationalInfoBar.js.map