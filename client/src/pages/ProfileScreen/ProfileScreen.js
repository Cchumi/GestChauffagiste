import React, { useRef, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Password } from 'primereact/password';
import { Menu } from "primereact/menu";
import { UserContext } from '../../context/UserContext';

export const ProfileScreen = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const history = useHistory();
  const Logout = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
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
      history.push("/");
    })
  }

  const getMeInfo = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      console.log(response)
      const data = await response.json();
      console.log(data)
    })
  }

  const toolbarRightTemplate = () => {
    return (
      <>
        <Button label="Logout" icon="pi pi-plus" style={{ marginRight: '.5em' }} onClick={Logout} />
        <Button label="Open" icon="pi pi-info" className="p-button-secondary"  onClick={getMeInfo} />

        <i className="pi pi-bars p-toolbar-separator" style={{ marginRight: '.5em' }}></i>

        <Button icon="pi pi-check" className="p-button-success" style={{ marginRight: '.5em' }} />
        <Button icon="pi pi-trash" className="p-button-warning" style={{ marginRight: '.5em' }} />
        <Button icon="pi pi-print" className="p-button-danger" />
      </>
    )
  };
  const toolbarLeftTemplate = () => {
    return (
      <>
        <Button label="New" icon="pi pi-plus" style={{ marginRight: '.5em' }} />
        <Button label="Open" icon="pi pi-folder-open" className="p-button-secondary" />

        <i className="pi pi-bars p-toolbar-separator" style={{ marginRight: '.5em' }}></i>

        <Button icon="pi pi-check" className="p-button-success" style={{ marginRight: '.5em' }} />
        <Button icon="pi pi-trash" className="p-button-warning" style={{ marginRight: '.5em' }} />
        <Button icon="pi pi-print" className="p-button-danger" />
      </>
    )
  };
  console.log(userContext)

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Bienvenue {userContext.details.firstName} {userContext.details.lastName}</h5>
          <Toolbar left={toolbarLeftTemplate} right={toolbarRightTemplate}></Toolbar>
        </div>
      </div>
    </div>
  )
}
