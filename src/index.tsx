import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CurrencyProvider from './context/CurrencyContext';

ReactDOM.render(
    <CurrencyProvider>
        <App />
    </CurrencyProvider>, document.getElementById('root'));

serviceWorker.register();
