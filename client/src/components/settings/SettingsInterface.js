import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';

import { AppConfig } from './AppConfig';
import { UserContext } from '../../context/UserContext';
//import  ThemeContext  from '../../context/themeContext';
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toolbar } from 'primereact/toolbar';
//import sagaBlue from '../../../public/assets/themes/saga-blue/theme.scss'
export const SettingsInterface = (props) => {
    console.log(props)
    const [userContext, setUserContext] = useContext(UserContext);
    //const [themeContext, setThemeContext] = useContext(ThemeContext);
   //console.log(themeContext)
   //const { societe } = userContext.details;
    const [societe, setSociete] = useState(userContext.details.societe || {})
    const [userInterface, setUserInterface] = useState(societe.config.interface || {})
    const [newUserInterface, setNewUserInterface] = useState(userInterface)
    //const [userContext, setUserContext] = useContext(UserContext);
    //console.log(userContext)
    //const { societe } = userContext.details;
    // console.log(societe)
    const [societeValues, setSocieteValues] = useState(societe);
    const [newSocieteValues, setNewSocieteValues] = useState(societe)
    //const [ripple, setRipple] = useState(true);
    const [layoutMode, setLayoutMode] = useState('static');
    const [scale, setScale] = useState(userInterface.scale || 14);
    /* const [layoutColorMode, setLayoutColorMode] = useState('light')
     const [inputStyle, setInputStyle] = useState('outlined');*/
    const [layoutColorMode, setLayoutColorMode] = useState(userInterface.layoutColorMode || 'dark')
    const [inputStyle, setInputStyle] = useState(userInterface.inputStyle || 'outlined');
    const [ripple, setRipple] = useState(userInterface.ripple || true);
    const [disabled, setDisabled] = useState(true)
    console.log(userInterface);
    console.log(newSocieteValues);
    useEffect(()=> {
        setSociete(userContext.details.societe)
        setUserInterface(userContext.details.societe.config.interface)
        //setNewUserInterface(userContext.details.societe.config.interface)
    }, [userContext])
    PrimeReact.ripple = true;
    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        console.log(mode)
        setLayoutMode(mode)
    }

    const onColorModeChange = (theme) => {
        console.log(theme)
        var test = {...societeValues, config: {...societeValues.config, interface: {...societeValues.config.interface, theme: theme}}};
        console.log(test);
        setNewSocieteValues({...societeValues, config: {...societeValues.config, interface: {...societeValues.config.interface, theme: theme}}})
        setLayoutColorMode(theme)
    }
    useEffect(()=> {
        setSociete(userContext.details.societe)
        setUserInterface(userContext.details.societe.config.interface)
        setNewUserInterface(userContext.details.societe.config.interface)
    }, [scale,  ])
    const onUserInterfaceChange = (interfaceValues) => {
        console.log(interfaceValues)
       // setUserInterface(values)
        setNewSocieteValues({...societeValues, config: {...societeValues.config, interface: {...interfaceValues}}})
    }
    const saveSociete = () => {
        console.log("SAVE SOCIETE");
        console.log(newSocieteValues)
        // fetch(process.env.REACT_APP_API_ENDPOINT + "clients/add", {
        fetch("/gestapi/users/updateSociete", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSocieteValues),
        }).then(async response => {
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                //setListOfUsers(data)
                //setListOfClients(data)
            } else {
                //setListOfUsers(...data)
            }
            // call refreshToken every 5 minutes to renew the authentication token.
            //setTimeout(verifyUsers, 20 * /*60 **/ 1000)
        })
    }
    const _toggleEditMode = () => {
        setNewSocieteValues(societe)
        setDisabled(!disabled)
    }

    const _saveSociete = () => {
        //setNewSocieteValues(societe)
        saveSociete();
        setDisabled(!disabled)
    }

    const decrementScale = () => {
        setScale((prevState) => --prevState);
    }

    const incrementScale = () => {
        setScale((prevState) => ++prevState);
    }

    useEffect(() => {
        document.documentElement.style.fontSize = scale + 'px';
    }, [scale])
    const leftContents = (
        <React.Fragment>
            <h5>Paramètres d'interface :</h5>
        </React.Fragment>
    );
    const rightContents = (
        <React.Fragment>
            {disabled &&
                <Button icon="pi pi-pencil" className="mr-2" label={'Modifier'} onClick={_toggleEditMode} />
            }
            {!disabled &&
                <React.Fragment>
                    <Button icon="pi pi-times-circle" className="mr-2" label={'Annuler'} onClick={_toggleEditMode} />
                    <Button icon="pi pi-save" label={'Enregistrer'} className="p-button-success mr-2" onClick={_saveSociete} />
                </React.Fragment>
            }

        </React.Fragment>
    );
    return (
        <div className="flex align-items-center py-5 px-3">

            <div className="col-12">

                <div className="cards">
                    {(userContext.details.role === "super-admin" || userContext.details.role === "societe-admin") &&
                        <Toolbar left={leftContents} right={rightContents} style={{ background: 'none' }} />
                    }
                    <div className="grid p-fluid">

                        <div className="col-12 md:col-6">
                            <AppConfig
                            userInterfaceValues={newUserInterface}
                            rippleEffect={ripple}
                            onRippleEffect={onRipple}
                            inputStyle={inputStyle}
                            onInputStyleChange={onInputStyleChange}
                            layoutMode={layoutMode}
                            onLayoutModeChange={onLayoutModeChange}
                            onUserInterfaceChange={onUserInterfaceChange}
                            layoutColorMode={layoutColorMode}
                            onColorModeChange={onColorModeChange}
                            decrementScale ={decrementScale}
                            incrementScale={incrementScale}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
