"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var PropTypes = require('prop-types');
const dx_react_grid_1 = require("@devexpress/dx-react-grid");
const dx_react_grid_material_ui_1 = require("@devexpress/dx-react-grid-material-ui");
class DeviceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { name: 'status', title: 'Status', dataType: 'status' },
                { name: 'device', title: 'Device' },
                { name: 'response', title: 'Response (ms)' }
            ],
            rows: this.generateRows(this.props.devices)
        };
    }
    generateRows(devices) {
        var data = [];
        for (let device of devices) {
            var status = "green", pings = 0, unresponsive = 0, avResponse = 0;
            for (let record of device.ping_records) {
                pings += 1;
                if (!record.responded)
                    unresponsive += 1;
                avResponse += record.ms_response;
            }
            avResponse = Math.round(avResponse / (pings - unresponsive));
            if (unresponsive > 0 || pings == 0) {
                status = "orange";
                if (unresponsive == pings)
                    status = "red";
            }
            var record = {
                device: device.description,
                status: status,
                response: avResponse
            };
            data.push(record);
        }
        return data;
    }
    render() {
        const { rows, columns } = this.state;
        return (React.createElement(dx_react_grid_material_ui_1.Grid, { rows: rows, columns: columns },
            React.createElement(dx_react_grid_1.SortingState, { defaultSorting: [
                    { columnName: 'status', direction: 'desc' }
                ] }),
            React.createElement(dx_react_grid_1.DataTypeProvider, { type: 'status', formatterTemplate: (value) => {
                    return (React.createElement("span", { className: "responseCircle" },
                        React.createElement("div", { style: { backgroundColor: value.value } })));
                } }),
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
            React.createElement(dx_react_grid_material_ui_1.TableView, null),
            React.createElement(dx_react_grid_material_ui_1.TableHeaderRow, { allowSorting: true })));
    }
}
exports.DeviceTable = DeviceTable;
//# sourceMappingURL=DeviceTable.js.map