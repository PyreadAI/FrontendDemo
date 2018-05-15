"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TabularViewContainer_1 = require("./components/TabularViewContainer");
// import {NewMapContainer} from "./components/NewMapContainer";
const MapContainer_1 = require("./components/MapContainer");
const SummaryContainer_1 = require("./components/SummaryContainer");
const ReportContainer_1 = require("./components/ReportContainer");
const PresentationalInfoBar_1 = require("./components/PresentationalInfoBar");
const DataLoader_1 = require("./DataLoader");
const react_grid_layout_1 = require("react-grid-layout");
const moment = require("moment");
const ResponsiveReactGridLayout = react_grid_layout_1.WidthProvider(react_grid_layout_1.Responsive);
const globalAny = global;
function layoutsAreEqual(l1, l2) {
    if (l1.length != l2.length)
        return false;
    for (let i = 0; i < l1.length; i++) {
        return l1[i].i == l2[i].i &&
            l1[i].w == l2[i].w &&
            l1[i].h == l2[i].h &&
            l1[i].x == l2[i].x &&
            l1[i].y == l2[i].y;
    }
}
class main extends React.Component {
    constructor(props) {
        super(props);
        this.layouts = {
            default: [
                { i: 'sites', x: 0, y: 0, w: 2, h: 4 },
                { i: 'map', x: 2, y: 0, w: 2, h: 2 },
                { i: 'summary', x: 2, y: 2, w: 2, h: 2 }
            ],
            fullmap: [
                { w: 4, h: 4, x: 0, y: 0, i: 'map' }
            ],
            report: [
                { i: 'sites', x: 0, y: 0, w: 2, h: 4 },
                { i: 'report', x: 2, y: 0, w: 2, h: 4 }
            ],
            saved: []
        };
        this.dt = new DataLoader_1.DataLoader();
        this.myFormat = 'YYYY-MM-DD[T]HH:mm';
        let height = window.innerHeight;
        //uniserve header
        this.state = {
            Sites: [],
            SelectedSite: null,
            Layout: { lg: this.layouts.default },
            LayoutName: "default",
            ViewHeight: window.innerHeight - 70,
            layoutupdate: false,
            CurrentTime: ""
        };
    }
    componentDidMount() {
        let that = this;
        this.dt.loader().then((data) => {
            let curr = moment().format(this.myFormat).replace("T", " ");
            this.setState({ Sites: data, SelectedSite: data[0], layoutupdate: false, CurrentTime: curr });
        }).catch((str) => {
            alert(str);
        });
    }
    componentDidUpdate() {
        this.timer = window.setTimeout(() => {
            this.dt.loader().then((data) => {
                let curr = moment().format(this.myFormat).replace("T", " ");
                this.setState({ Sites: data, SelectedSite: this.state.SelectedSite, layoutupdate: false, CurrentTime: curr });
            }).catch((str) => {
                alert(str);
            });
        }, 60000);
    }
    setSelectedSite(siteID) {
        for (let site of this.state.Sites) {
            if (siteID == site.site_recid) {
                this.setState({ SelectedSite: site });
            }
        }
    }
    setLayout(layoutname) {
        let layout = this.layouts[layoutname];
        this.setState({
            Layout: { lg: layout },
            layoutupdate: true,
            LayoutName: layoutname
        });
    }
    handleLayoutChange(layout) {
        if (!layoutsAreEqual(layout, this.layouts.fullmap)) {
            this.layouts.saved = layout;
            this.setState({ Layout: { lg: layout } });
        }
    }
    renderGridComponents() {
        let toReturn = [];
        let displaySummary = (this.state.LayoutName == "default");
        let displayReport = (this.state.LayoutName == "report");
        let displayMap = (this.state.LayoutName == "default")
            || (this.state.LayoutName == "fullmap");
        let displaySites = (this.state.LayoutName == "default")
            || (this.state.LayoutName == "report");
        if (displaySites) {
            toReturn.push(React.createElement("div", { key: "sites" },
                React.createElement(TabularViewContainer_1.TabularViewContainer, { SetLayout: this.setLayout.bind(this), Sites: this.state.Sites, SelectSite: this.setSelectedSite.bind(this), SelectedSite: this.state.SelectedSite })));
        }
        if (displayMap) {
            toReturn.push(React.createElement("div", { key: "map" },
                React.createElement(MapContainer_1.MapContainer, { SetLayout: this.setLayout.bind(this), Sites: this.state.Sites, SetSelectedSite: this.setSelectedSite.bind(this), SelectedSite: this.state.SelectedSite, layoutupdate: this.state.layoutupdate })));
        }
        if (displaySummary) {
            toReturn.push(React.createElement("div", { key: "summary" },
                React.createElement(SummaryContainer_1.SummaryContainer, { Site: this.state.SelectedSite })));
        }
        if (displayReport) {
            toReturn.push(React.createElement("div", { key: "report" },
                React.createElement(ReportContainer_1.ReportContainer, { SelectedSite: this.state.SelectedSite, SetLayout: this.setLayout.bind(this) })));
        }
        return toReturn;
    }
    render() {
        this.timer = window.clearTimeout(this.timer);
        var rowHeight = Math.floor(this.state.ViewHeight / 4);
        return React.createElement("div", { className: "grid-container" },
            React.createElement(PresentationalInfoBar_1.InfoBar, { location: "Vancouver", CurrentTime: this.state.CurrentTime }),
            React.createElement(ResponsiveReactGridLayout, { className: "layout", layouts: this.state.Layout, cols: { lg: 4, md: 4, sm: 4, xs: 2, xxs: 2 }, rowHeight: rowHeight, draggableHandle: ".container-bar", draggableCancel: ".no-drag", onLayoutChange: this.handleLayoutChange.bind(this), margin: [5, 5] }, this.renderGridComponents()));
    }
}
exports.default = main;
//# sourceMappingURL=main.js.map