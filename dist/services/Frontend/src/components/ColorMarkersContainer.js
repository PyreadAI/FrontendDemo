"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const { OverlayView } = require("react-google-maps");
class ColorMarkers extends React.Component {
    constructor(props) {
        super(props);
        this.getPixelPositionOffset = (width, height) => ({
            x: -(width / 2),
            y: -(height / 2) + 10,
        });
    }
    componentWillReceiveProps(next) {
        this.setState({ Sites: next.Sites });
    }
    render() {
        return (this.state.Sites.map((s) => {
            return React.createElement(OverlayView, { position: { lat: Number(s.latitude), lng: Number(s.longitude) }, mapPaneName: OverlayView.OVERLAY_MOUSE_TARGET, getPixelPositionOffset: this.getPixelPositionOffset },
                React.createElement("div", null));
        }));
    }
}
exports.ColorMarkers = ColorMarkers;
//# sourceMappingURL=ColorMarkersContainer.js.map