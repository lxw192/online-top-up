import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import Register from './Register/Register';
import Menu from './menu/menu';
import Index from './Index/Index';
import Index1 from './Index/Index1';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './store/reducer/index';
import logger from 'redux-logger';
import getrouter from './routers/router';
// import { browserHistory } from 'react-router';
// import { Router,Route, IndexRoute ,  } from 'react-router';
import { HashRouter , Router,Route ,Switch ,Redirect } from 'react-router-dom';
const store = createStore(   //创建store
    Reducers,               //绑定reducers  
    compose(applyMiddleware(        
        thunk                   //异步处理
        // ,
        // logger                  //redux  控制台 调试工具   类似于console.log()
    ),
        window.devToolsExtension ? window.devToolsExtension() : undefined,    //redux devtools  调试工具
    ),
)

ReactDOM.render(
    <Provider store={store} >
        <HashRouter>
            <Switch>
                <Route path="/" exact component={App} ></Route>
                <Route path="/register" component={Register} ></Route>
                <Route path="/menu" exact component={Menu} ></Route>
                <Menu path="/menu" component={Menu} >
                    <Route path="/menu/home" component={Index} ></Route>
                    <Route path="/menu/home1" component={Index1} ></Route>
                </Menu>
                <Route path="/menu/home" component={Index} ></Route>
            <Route path="/menu/home1" component={Index1} ></Route>
            </Switch>

            
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
