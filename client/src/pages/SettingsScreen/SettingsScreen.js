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
import { SettingsMain } from '../../components/settings/SettingsMain';
import { SettingsSociete } from '../../components/settings/SettingsSociete';
import { SettingsUtilisateurs } from '../../components/settings/SettingsUtilisateurs';
import { SettingsInterface } from '../../components/settings/SettingsInterface';
import { SettingsModels } from '../../components/settings/SettingsModels';

export const SettingsScreen = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();
  
  const wizardItems = [
    { label: 'Profil', command: () => history.push('/settings') },
    { label: 'Société', command: () => history.push('/settings/societe') },
    { label: 'Utilisateurs', command: () => history.push('/settings/utilisateurs') },
    { label: 'Interface', command: () => history.push('/settings/interface') },
    { label: 'Modèles', command: () => history.push('/settings/models') },

];
  const toolbarRightTemplate = () => {
    return (
      <>
        <Button label="Logout" icon="pi pi-plus" style={{ marginRight: '.5em' }} onClick={console.log('')} />
        <Button label="Open" icon="pi pi-info" className="p-button-secondary" onClick={console.log('')} />

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
          <h5>Réglages</h5>
          
          {userContext.details.role === "super-admin" &&
            <div className="col-12 md:col-12">
              <div className="card card-w-title">
                <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <Route exact path={'/settings'} component={SettingsMain} />
                <Route path={'/settings/societe'} component={SettingsSociete} />
                <Route path={'/settings/utilisateurs'} component={SettingsUtilisateurs} />
                <Route path={'/settings/interface'} component={SettingsInterface} />
                <Route path={'/settings/models'} component={SettingsModels} />
              </div>
            </div>
          }
          {userContext.details.role === "societe-admin" &&
            <div className="col-12 md:col-12">
              <div className="card card-w-title">
                <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <Route exact path={'/settings'} component={SettingsMain} />
                <Route path={'/settings/societe'} component={SettingsSociete} />
                <Route path={'/settings/utilisateurs'} component={SettingsUtilisateurs} />
                <Route path={'/settings/interface'} component={SettingsInterface} />
                <Route path={'/settings/models'} component={SettingsModels} />
              </div>
            </div>
          }
          {userContext.details.role === "user" &&
            <div className="col-12 md:col-12">
              <div className="card card-w-title">
                <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <Route exact path={'/settings'} component={SettingsMain} />
                <Route path={'/settings/interface'} component={SettingsInterface} />

              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
