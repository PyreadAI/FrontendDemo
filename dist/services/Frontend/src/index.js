"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_hot_loader_1 = require("react-hot-loader");
const main_1 = require("./main");
const render = (Component) => {
    ReactDOM.render(React.createElement(react_hot_loader_1.AppContainer, null,
        React.createElement(Component, null)), document.getElementById("container"));
};
render(main_1.default);
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./main', () => { render(require('./main').default); });
}
//# sourceMappingURL=index.js.map