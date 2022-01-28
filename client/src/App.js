import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import classNames from 'classnames';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LoginScreen from './pages/LoginScreen/LoginScreen';

import RegisterScreen from './pages/RegisterScreen/RegisterScreen';
//import { Profile } from './pages/ProfileScreen/ProfileScreen';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import axios from "axios";
import HomeScreen from './Home'
import Loader from "./components/Loader"
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
//import { myContext } from './context/Context';
import { UserContext } from './context/UserContext';
//import { AuthContext } from './context/AuthContext';
//import { user } from '../../server/controllers/AuthController';
//Amplify.configure(awsconfig);
const App = () => {
    //const ctx = useContext(myContext);

    const [currentTab, setCurrentTab] = useState(0)
    const [userContext, setUserContext] = useContext(UserContext)

    const verifyUser = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async response => {
            if (response.ok) {
                const data = await response.json()
                setUserContext(oldValues => {
                    return { ...oldValues, token: data.token }
                })
            } else {
                setUserContext(oldValues => {
                    return { ...oldValues, token: null }
                })
            }
            // call refreshToken every 5 minutes to renew the authentication token.
            setTimeout(verifyUser, 5 * 60 * 1000)
        })
    }, [setUserContext])

    useEffect(() => {
        verifyUser()
    }, [verifyUser])

    const Login = () => {
        return (
            <div className="grids h-screen flex md:w-full w-screen align-items-center lg:align-items-center justify-content-center surface-ground">
                <div className='h-screen w-screen absolute z-0 bg-cover bg-no-repeat' style={{ backgroundImage: 'url("./images/pages/login.png")', backgroundSize: '110%', filter: 'blur(20px)' }} />
                {<div className='h-screen w-screen absolute z-0' style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />}

                <div className="col-10 lg:col-2 z-1 absolute"><LoginScreen /></div>
            </div>
        )
    }
    const Register = () => {
        return (
            <div className="grids h-screen flex md:w-full w-screen align-items-center lg:align-items-center justify-content-center surface-ground">
                <div className='h-screen w-screen absolute z-0 bg-cover bg-no-repeat' style={{ backgroundImage: 'url("./images/pages/login.png")', backgroundSize: '110%', filter: 'blur(10px)' }} />
                {<div className='h-screen w-screen absolute z-0' style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />}

                <div className="col-10 lg:col-2 z-1 absolute"><RegisterScreen /></div>
            </div>
        )
    }
    console.log(userContext)
    return userContext.token === null ? (
        <div className="grids auth-screens h-screen flex md:w-full w-screen align-items-center lg:align-items-center justify-content-center surface-ground">
            <div className='h-screen w-screen absolute z-0 bg-cover bg-no-repeat' style={{ backgroundImage: 'url("./images/pages/login.png")', backgroundSize: '110%', filter: 'blur(20px)' }} />
            {<div className='h-screen w-screen absolute z-0' style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />}
            <div className="col-10 lg:col-2 z-1 absolute">
                <TabView activeIndex={currentTab} onTabChange={(e) => setCurrentTab(e.index)} className="p-0" style={{backgroundColor: 'transparent'}}>
                    <TabPanel header="Connexion" className="p-0">
                        <LoginScreen />
                    </TabPanel>
                    <TabPanel header="Inscription" className="p-0">
                        <RegisterScreen />
                    </TabPanel>

                </TabView>
            </div>
        </div>
    ) : userContext.token ? (
        <HomeScreen />
    ) : (
        <Loader />
    )
}

export default App;
