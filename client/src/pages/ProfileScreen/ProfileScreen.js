import React, { useRef, useContext, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
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
import { TabMenu } from 'primereact/tabmenu';
import { UserContext } from '../../context/UserContext';
import { PersonalDemo } from '../../components/menu/PersonalDemo';
import { ConfirmationDemo } from '../../components/menu/ConfirmationDemo';
import { PaymentDemo } from '../../components/menu/PaymentDemo';
import { SeatDemo } from '../../components/menu/SeatDemo';

export const ProfileScreen = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();
  const Logout = () => {
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
      history.push("/");
    })
  }

  const getMeInfo = () => {
    //process.env.REACT_APP_API_ENDPOINT + 
    fetch("/users/me", {
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
  const wizardItems = [
    { label: 'Profil', command: () => history.push('/profile') },
    { label: 'Société', command: () => history.push('/profile/societe') },
    { label: 'Utilisateurs', command: () => history.push('/profile/utilisateurs') },

];
  const toolbarRightTemplate = () => {
    return (
      <>
        <Button label="Logout" icon="pi pi-plus" style={{ marginRight: '.5em' }} onClick={Logout} />
        <Button label="Open" icon="pi pi-info" className="p-button-secondary" onClick={getMeInfo} />

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
          {userContext.details.role === "admin" &&
            <div className="col-12 md:col-6">
              <div className="card card-w-title">
                <h5>TabMenu</h5>
                <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <Route exact path={'/profile'} component={PersonalDemo} />
                <Route path={'/profile/societe'} component={ConfirmationDemo} />
                <Route path={'/profile/utilisateurs'} component={PaymentDemo} />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
