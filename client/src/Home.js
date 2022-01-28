import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import classNames from 'classnames';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';
import { ProfileScreen } from './pages/ProfileScreen/ProfileScreen'
import { Dashboard } from './components/Dashboard';
//import { ClientsLayout } from './components/ClientsLayout';
import { ButtonDemo } from './components/ButtonDemo';
import { ChartDemo } from './components/ChartDemo';
import { Documentation } from './components/Documentation';
import { FileDemo } from './components/FileDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { ListDemo } from './components/ListDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { MiscDemo } from './components/MiscDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { MediaDemo } from './components/MediaDemo';
import { PanelDemo } from './components/PanelDemo';
import { TableDemo } from './components/TableDemo';
import { TreeDemo } from './components/TreeDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';
import { BlocksDemo } from './components/BlocksDemo';
import { IconsDemo } from './components/IconsDemo';

import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';
import { TimelineDemo } from './pages/TimelineDemo';


/*PAGES*/
import ClientsScreen from './pages/Clients/ClientsScreen';
import ClientsDetailsScreen from './pages/Clients/ClientsDetailsScreen'
import UsersScreen from './pages/Users/UsersScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';

import RegisterScreen from './pages/RegisterScreen/RegisterScreen';
//import { Profile } from './pages/ProfileScreen/ProfileScreen';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import axios from "axios";
import { UserContext } from "./context/UserContext"
import Loader from "./components/Loader"

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
//Amplify.configure(awsconfig);
const HomeScreen = () => {
    const history = useHistory();
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const [loggedInState, setLoggedInState] = useState("");
    const [cv, setcv] = useState(false);
    const [state, setState] = useState({})
    PrimeReact.ripple = true;

    const [userContext, setUserContext] = useContext(UserContext)

    let menuClick = false;
    let mobileTopbarMenuClick = false;


    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }
    const goToProfile = useCallback(() => history.push('/profile'), [history]);
    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        console.log('profile');
        goToProfile();
        // logoutHandler();
        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'

            },
            { label: 'Clients', icon: 'pi pi-fw pi-id-card', to: '/clients' },
            { label: 'Utilisateurs', icon: 'pi pi-fw pi-user', to: '/users', role: 'admin' },
            ]
        },
        {
            label: 'UI Components', icon: 'pi pi-fw pi-sitemap', role: 'admin',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
                { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
                { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
            ]
        },
        {
            label: 'UI Blocks', role: 'admin',
            items: [
                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: "NEW" },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-react' }
            ]
        },
        {
            label: 'Icons', role: 'admin',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/icons' }
            ]
        },
        {
            label: 'Pages', icon: 'pi pi-fw pi-clone', role: 'admin',
            items: [
                { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' }
            ]
        },
        {
            label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search', role: 'admin',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Get Started', role: 'admin',
            items: [
                { label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => { window.location = "#/documentation" } },
                { label: 'View Source', icon: 'pi pi-fw pi-search', command: () => { window.location = "https://github.com/primefaces/sakai-react" } }
            ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });
    const fetchUserDetails = useCallback(() => {
        //process.env.REACT_APP_API_ENDPOINT + 
        fetch("/users/me", {
            method: "GET",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async response => {
            if (response.ok) {
                const data = await response.json()
                setUserContext(oldValues => {
                    return { ...oldValues, details: data }
                })
            } else {
                if (response.status === 401) {
                    // Edge case: when the token has expired.
                    // This could happen if the refreshToken calls have failed due to network error or
                    // User has had the tab open from previous day and tries to click on the Fetch button
                    window.location.reload()
                } else {
                    setUserContext(oldValues => {
                        return { ...oldValues, details: null }
                    })
                }
            }
        })
    }, [setUserContext, userContext.token])

    useEffect(() => {
        // fetch only when user details are not present
        if (!userContext.details) {
            fetchUserDetails()
        }
    }, [userContext.details, fetchUserDetails])
    const logoutHandler = () => {
        //process.env.REACT_APP_API_ENDPOINT + 
        fetch("/users/logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async response => {
            setUserContext(oldValues => {
                return { ...oldValues, details: undefined, token: null }
            })
            window.localStorage.setItem("logout", Date.now())
        })
    }
    const refetchHandler = () => {
        // set details to undefined so that spinner will be displayed and
        //  fetchUserDetails will be invoked from useEffect
        setUserContext(oldValues => {
            return { ...oldValues, details: undefined }
        })
    }
    return userContext.details === null ? (
        "Error Loading User details"
    ) : !userContext.details ? (
        <Loader />
    ) : (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Switch>
                        <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} />} />
                        <Route path="/clients" component={ClientsScreen} />
                        <Route path="/client/:clientId" component={ClientsDetailsScreen} />
                        <Route path="/users" component={UsersScreen} />
                        
                        <Route path="/profile" component={ProfileScreen} />
                        <Route path="/formlayout" component={FormLayoutDemo} />
                        <Route path="/input" component={InputDemo} />
                        <Route path="/floatlabel" component={FloatLabelDemo} />
                        <Route path="/invalidstate" component={InvalidStateDemo} />
                        <Route path="/button" component={ButtonDemo} />
                        <Route path="/table" component={TableDemo} />
                        <Route path="/list" component={ListDemo} />
                        <Route path="/tree" component={TreeDemo} />
                        <Route path="/panel" component={PanelDemo} />
                        <Route path="/overlay" component={OverlayDemo} />
                        <Route path="/media" component={MediaDemo} />
                        <Route path="/menu" component={MenuDemo} />
                        <Route path="/messages" component={MessagesDemo} />
                        <Route path="/blocks" component={BlocksDemo} />
                        <Route path="/icons" component={IconsDemo} />
                        <Route path="/file" component={FileDemo} />
                        <Route path="/chart" render={() => <ChartDemo colorMode={layoutColorMode} />} />
                        <Route path="/misc" component={MiscDemo} />
                        <Route path="/timeline" component={TimelineDemo} />
                        <Route path="/crud" component={Crud} />
                        <Route path="/empty" component={EmptyPage} />
                        <Route path="/documentation" component={Documentation} />
                    </Switch>
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default HomeScreen;
