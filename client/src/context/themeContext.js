import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { UserContext } from "./UserContext"
import PrimeReact from 'primereact/api';
// Context has been created
/*const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false,
    'layout-theme-light': layoutColorMode === 'light'
});*/
const ThemeContext = React.createContext({
    dark: false,
    toggle: () => { },
    interface: {}
}
)
// Provider
const ThemeProvider = ({ children }) => {
    // keeps state of the current chosen theme
    const [userContext, setUserContext] = useContext(UserContext);
    const [dark, setDark] = useState(window.localStorage.getItem('darkTheme'));
    const [layoutMode, setLayoutMode] = useState('static');
    const [scale, setScale] = useState(12);
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    let wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        //'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        //'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        //'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });
    useEffect(() => {
        

    }, [userContext])
  
    // paints the app before it renders elements
    useEffect(() => {
        const lastTheme = window.localStorage.getItem('darkTheme');
        if (userContext.details) {
            if (userContext.details.societe.config.interface) {
                console.log('switch theme')
                console.log(userContext.details.societe.config.interface)
                setLayoutMode(userContext.details.societe.config.interface.layoutMode)
                setLayoutColorMode(userContext.details.societe.config.interface.layoutColorMode)
                setScale(userContext.details.societe.config.interface.scale)
                setLayoutColorMode(userContext.details.societe.config.interface.layoutColorMode)
                setInputStyle(userContext.details.societe.config.interface.inputStyle)
                setRipple(userContext.details.societe.config.interface.ripple)
              /* wrapperClass = classNames('layout-wrapper', {
                    'layout-overlay': layoutMode === 'overlay',
                    'layout-static': layoutMode === 'static',
                    //'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
                    //'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
                    //'layout-mobile-sidebar-active': mobileMenuActive,
                    'p-input-filled': inputStyle === 'filled',
                    'p-ripple-disabled': ripple === false,
                    'layout-theme-light': layoutColorMode === 'light'
                });*/
                setTimeout(() => {
                    applyTheme(darkTheme);
                  }, 500);
                
                //setTheme(userContext.details.societe.config.interface.theme)
               /* if (lastTheme === 'true') {
                    setDark(true);
                    applyTheme(darkTheme);
                }
        
                if (!lastTheme || lastTheme === 'false') {
                    setDark(false);
                    applyTheme(lightTheme);
                }*/
            }
            else {
                console.log('else')
                //setTheme('lara-light-indigo')
            }
        }
        

        // if state changes, repaints the app
    }, [dark, userContext]);


    
    const applyTheme = theme => {
        console.log(wrapperClass)
        console.log(layoutColorMode)
        const wrapper = document.querySelectorAll(".layout-wrapper")[0]; //document.getElementsByClassName('layout-wrapper')[0];
        console.log(wrapper)
        wrapper.className = wrapperClass;
       // const root = document.getElementsByTagName('html')[0];
        //root.style.cssText = theme.join(';');
    }
    useEffect(() => {
        document.documentElement.style.fontSize = scale + 'px';
    }, [scale])

    const toggle = () => {
        setDark(!dark);
        window.localStorage.setItem('darkTheme', !dark);
    };
    //const [toggle, setToggle] = React.useState(false);
   /*const toggleFunction = () => {
        setToggle(!toggle);
    };*/
    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeContext, ThemeProvider };

// styles
const lightTheme = [
    '--border: rgba(0,0,0,.2)',
    '--shadow: #000',
    '--heading: rgba(255,100,0,1)',
    '--main: #1d8f13',
    '--text: #000',
    '--textAlt: #fff',
    '--inactive: rgba(0,0,0,.3)',
    '--background: #fff',
  ];
  
  const darkTheme = [
    '--border: rgba(255,255,255,.1)',
    '--shadow: #000',
    '--heading: rgba(255,255,5,.9)',
    '--main: #79248f',
    '--text: rgb(255, 255, 255)',
    '--textAlt: #fff',
    '--inactive: rgba(255,255,255,.3)',
    '--background: #2D2D2D',
  ];