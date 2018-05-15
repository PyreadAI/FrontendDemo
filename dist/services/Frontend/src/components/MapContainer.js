"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MarkerWrappers_1 = require("./MarkerWrappers");
const { compose, withProps, withHandlers } = require("recompose");
const IconButton_1 = require("material-ui/IconButton");
const ViewModule_1 = require("material-ui-icons/ViewModule");
const AspectRatio_1 = require("material-ui-icons/AspectRatio");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, OverlayView } = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updated = true;
        this._renderMap = (() => {
            let container = React.createElement("div", { id: "newmap", className: "container-inner", style: { height: "100%", width: "100%", position: "absolute" } });
            let map = React.createElement("div", { id: "newmapcontainer", style: { height: "95%", width: "100%" } });
            this.Map = withGoogleMap((props) => {
                return (React.createElement(GoogleMap, { defaultZoom: 8, zoom: 9, defaultCenter: { lat: Number(props.SelectedSite.latitude), lng: Number(props.SelectedSite.longitude) } },
                    React.createElement(MarkerClusterer, { averageCenter: true, enableRetinaIcons: true, gridSize: 60, defaultMinimumClusterSize: 3, defaultZoomOnClick: true }, props.markers)));
            });
            return function (sites, ID, SetSelectedSite, SelectedSite, layout) {
                let Map_new = this.Map;
                if ((layout && !this.update) || (SelectedSite && this.state.siteID != SelectedSite.site_recid)) {
                    Map_new = withGoogleMap((props) => {
                        return (React.createElement(GoogleMap, { defaultZoom: 8, defaultCenter: { lat: Number(props.SelectedSite.latitude), lng: Number(props.SelectedSite.longitude) }, zoom: 9 },
                            React.createElement(MarkerClusterer, { averageCenter: true, enableRetinaIcons: true, gridSize: 60, defaultMinimumClusterSize: 3, defaultZoomOnClick: true }, props.markers)));
                    });
                    this.update = true;
                }
                else {
                    this.update = false;
                }
                let map_ele = React.createElement(Map_new, { sites: sites, SelectedSite: SelectedSite, containerElement: container, mapElement: map, markers: React.createElement(MarkerWrappers_1.MarkerWrappers, { Sites: sites, ClickedId: ID, SetSelectedSite: SetSelectedSite }) });
                this.setState({ Map: map_ele });
            };
        })();
        this.state = {
            Map: React.createElement("div", null),
            siteID: this.props.SelectedSite ? this.props.SelectedSite.site_recid : -1
        };
    }
    componentWillReceiveProps(next) {
        this._renderMap(next.Sites, next.SelectedSite.site_recid, next.SetSelectedSite, next.SelectedSite, next.layoutupdate);
        this.setState({ siteID: next.SelectedSite.site_recid });
    }
    render() {
        return React.createElement("div", { className: "myContainer" },
            React.createElement("div", { className: "container-bar" },
                React.createElement("h5", { className: "title" }, "Map"),
                React.createElement(IconButton_1.default, { onClick: this.props.SetLayout.bind(this, "fullmap"), className: "bar-button" },
                    React.createElement(AspectRatio_1.default, { style: { color: "white" } })),
                React.createElement(IconButton_1.default, { onClick: this.props.SetLayout.bind(this, "default"), className: "bar-button" },
                    React.createElement(ViewModule_1.default, { style: { color: "white" } }))),
            this.state.Map);
    }
}
exports.MapContainer = MapContainer;
//# sourceMappingURL=MapContainer.js.map