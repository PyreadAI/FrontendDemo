"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MapIframeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { MAP_API_KEY: "AIzaSyBPUUMxqRaHjBgeaedmPmBHBjWfmEFihiw" };
    }
    render() {
        return React.createElement("iframe", { id: 'map', src: "https://www.google.com/maps/embed/v1/view?key=" + this.state.MAP_API_KEY + "&center=64,-96&zoom=3&maptype=roadmap" });
    }
}
exports.MapIframeContainer = MapIframeContainer;
//# sourceMappingURL=MapIframeContainer.js.map