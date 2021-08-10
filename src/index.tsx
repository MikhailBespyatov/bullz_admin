import 'antd/dist/antd.less';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// TODO: is it needed ?
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
