import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunc from 'redux-thunk';

import GeneralLayOut from './compoentns/General-layout';
import Jokes from './containers/Jokes';
import './styles/index.css';
import reducer from './store';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunc)));

ReactDOM.render(
    <Provider store={store}>
        <GeneralLayOut>
            <Jokes />
        </GeneralLayOut>
    </Provider>,
    document.getElementById('root')
);