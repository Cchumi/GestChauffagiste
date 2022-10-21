import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter, BrowserRouter, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import ScrollToTop from './ScrollToTop';
import { UserProvider } from "./context/UserContext"
import { ThemeProvider } from "./context/themeContext";
const history = createBrowserHistory(/*{forceRefresh:true}*/);
ReactDOM.render(
    <Router history={history} /*forceRefresh={true}*/ /*basename="/gest"*/>
        <ScrollToTop>
            <UserProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </UserProvider>
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();