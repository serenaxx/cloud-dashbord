import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Layout from '@src/layouts';
import Home from '@src/pages/home';
import 'antd/dist/antd.css';
import './App.css';
import '@assets/css/common.less';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home}/>
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
