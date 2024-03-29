import React, { useContext, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';


import { UserContext } from '../../context/UserContext';
import { InterventionsMain } from '../../components/Interventions/InterventionsMain';


const InterventionsScreen = () => {
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
    /*const toolbarRightTemplate = () => {
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
    };*/
    console.log(userContext)

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Interventions</h5>
                    <InterventionsMain />
                </div>
            </div>
        </div>
    )
}
export default InterventionsScreen
