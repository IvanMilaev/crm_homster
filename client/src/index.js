import React from 'react';
import {render} from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from '_config'
import * as serviceWorker from './serviceWorker';
import Main from 'containers/main';

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Main />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)

serviceWorker.unregister();
