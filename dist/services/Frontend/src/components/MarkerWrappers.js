"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PresentationalMarkerWrapper_1 = require("./PresentationalMarkerWrapper");
const { compose } = require("recompose");
const { Marker, InfoWindow } = require("react-google-maps");
class MarkerWrappers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clicked: this.props.ClickedId
        };
    }
    componentWillReceiveProps(next) {
        this.setState({ Clicked: next.ClickedId });
    }
    render() {
        let map_ele = this.props.Sites.map((s, key) => {
            return React.createElement(PresentationalMarkerWrapper_1.MarkerWrapper, { key: s.site_recid, Site: s, clicked: this.state.Clicked, SetSelectedSite: this.props.SetSelectedSite });
        });
        return map_ele;
    }
}
exports.MarkerWrappers = MarkerWrappers;
//# sourceMappingURL=MarkerWrappers.js.map