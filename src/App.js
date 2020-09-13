import React from 'react';
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import reducers from '@src/reducers'
import Layout from '@src/layouts';
import Home from '@src/pages/home';
import 'antd/dist/antd.css';
import './App.css';
import '@assets/css/common.less';

const store = createStore(reducers, applyMiddleware(thunk, promise));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home}/>
              </Switch>
            </Layout>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
