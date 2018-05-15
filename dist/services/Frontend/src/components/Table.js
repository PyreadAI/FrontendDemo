"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DeviceTable_1 = require("./DeviceTable");
const ReportIcon_1 = require("./ReportIcon");
const material_ui_1 = require("material-ui");
const dx_react_grid_1 = require("@devexpress/dx-react-grid");
const dx_react_grid_material_ui_1 = require("@devexpress/dx-react-grid-material-ui");
const FilterCell = ({ filter, setFilter, placeholder }) => (React.createElement(material_ui_1.TableCell, { style: { paddingLeft: "8px" } },
    React.createElement(material_ui_1.Input, { style: { width: "95px" }, type: "string", value: filter ? filter.value : '', onChange: e => setFilter(e.target.value ? { value: e.target.value } : null), placeholder: placeholder })));
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.getColumnPredicate = columnName => ((columnName == 'response') ? this.responseFilter : undefined);
        this.state = {
            columns: [
                { name: 'status', title: 'Status', dataType: 'status' },
                { name: 'site', title: 'Site' },
                { name: 'response', title: 'Response (ms)' },
                { name: 'report', title: 'Report', getCellValue: (row) => React.createElement(ReportIcon_1.ReportIcon, { SiteID: row.siteID, SetLayout: this.props.SetLayout, SelectSite: this.props.SelectSite }) }
            ],
            rows: this.generateRows(this.props.sites),
            SelectSite: props.SelectSite,
            selection: [0],
            expanded: []
        };
    }
    componentWillReceiveProps(next) {
        let siteData = this.generateRows(next.sites);
        let changed = false;
        let index = this.state.selection[0];
        if (siteData.length > 0 && next.SelectedSite) {
            for (let i = 0; i < siteData.length; i++) {
                if (siteData[i].siteID == next.SelectedSite.site_recid) {
                    if (i != index)
                        changed = true;
                    index = i;
                    break;
                }
            }
        }
        this.setState({ rows: siteData, SelectSite: next.SelectSite, selection: [index], expanded: changed ? [] : this.state.expanded });
    }
    handleRowSelection(selection) {
        let selected = [selection[selection.length - 1]];
        let empty = [];
        if (selection.length > 1) {
            this.setState({ selection: selected, expanded: empty });
            this.state.SelectSite(this.state.rows[selection[selection.length - 1]].siteID);
        }
        else {
            if (this.state.expanded.length == 1) {
                this.setState({ expanded: empty });
            }
            else {
                this.setState({ expanded: this.state.selection });
            }
        }
    }
    rowDetailTemplate(detailContent) {
        return (React.createElement("div", { className: "row-detail" },
            React.createElement("h6", null, " Devices: "),
            React.createElement(DeviceTable_1.DeviceTable, { devices: detailContent.row.devices })));
    }
    generateRows(sites) {
        var data = [];
        for (let site of sites) {
            var status = "green", pings = 0, unresponsive = 0, avResponse = 0;
            for (let device of site.devices) {
                for (let record of device.ping_records) {
                    pings += 1;
                    if (!record.responded)
                        unresponsive += 1;
                    avResponse += record.ms_response;
                }
            }
            avResponse = Math.round(avResponse / (pings - unresponsive));
            if (unresponsive > 0 || pings == 0) {
                status = "orange";
                if (unresponsive == pings)
                    status = "red";
            }
            var record = {
                site: site.description,
                devices: site.devices,
                status: status,
                response: avResponse,
                siteID: site.site_recid
            };
            data.push(record);
        }
        return data;
    }
    responseFilter(value, filter) {
        let firstChar = filter.value.charAt(0);
        if (firstChar == '>' || firstChar == '<') {
            let val = filter.value.substr(1, filter.value.length - 1);
            if (firstChar == '>')
                return value >= val;
            if (firstChar == '<')
                return value <= val;
            return value == val;
        }
        return value == filter.value;
    }
    render() {
        const { rows, columns, selection, expanded } = this.state;
        return (React.createElement(dx_react_grid_material_ui_1.Grid, { rows: rows, columns: columns },
            React.createElement(dx_react_grid_1.DataTypeProvider, { type: 'status', formatterTemplate: (value) => {
                    return (React.createElement("span", { className: "responseCircle" },
                        React.createElement("div", { style: { backgroundColor: value.value } })));
                } }),
            React.createElement(dx_react_grid_1.FilteringState, { defaultFilters: [] }),
            React.createElement(dx_react_grid_1.SortingState, { defaultSorting: [
                    { columnName: 'status', direction: 'desc' }
                ] }),
            React.createElement(dx_react_grid_1.RowDetailState, { expandedRows: expanded }),
            React.createElement(dx_react_grid_1.SelectionState, { selection: selection, onSelectionChange: this.handleRowSelection.bind(this) }),
            React.createElement(dx_react_grid_1.LocalFiltering, { getColumnPredicate: this.getColumnPredicate }),
            React.createElement(dx_react_grid_1.LocalSorting, { getColumnCompare: (columnName) => {
                    if (columnName == 'status') {
                        return (a, b) => {
                            let order = [
                                'green',
                                'orange',
                                'red'
                            ];
                            return (order.indexOf(a) - order.indexOf(b));
                        };
                    }
                    return undefined;
                } }),
            React.createElement(dx_react_grid_material_ui_1.DragDropContext, null),
            React.createElement(dx_react_grid_material_ui_1.TableView, null),
            React.createElement(dx_react_grid_material_ui_1.TableHeaderRow, { allowSorting: true, allowDragging: true }),
            React.createElement(dx_react_grid_material_ui_1.TableFilterRow, { filterCellTemplate: ({ column, filter, setFilter }) => {
                    if (column.name === 'status' || column.name === 'report') {
                        return React.createElement("p", null);
                    }
                    if (column.name === 'response') {
                        return React.createElement(FilterCell, { filter: filter, setFilter: setFilter, placeholder: "e.g. <10, 10, >10" });
                    }
                    return React.createElement(FilterCell, { filter: filter, setFilter: setFilter, placeholder: "Filter..." });
                } }),
            React.createElement(dx_react_grid_material_ui_1.TableSelection, { selectByRowClick: true, highlightSelected: true, showSelectionColumn: false }),
            React.createElement(dx_react_grid_material_ui_1.TableRowDetail, { detailRowTemplate: this.rowDetailTemplate })));
    }
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map