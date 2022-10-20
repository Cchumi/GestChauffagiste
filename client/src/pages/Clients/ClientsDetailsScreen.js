import "./ClientsScreen.css";
import React, { useEffect, useState, useCallback, useContext } from 'react';
import Axios from "axios";
//Route Imports
import { Link, browserHistory, useHistory, useParams } from "react-router-dom";
import { GMap } from 'primereact/gmap';
import { Toolbar } from 'primereact/toolbar';
//Prime Imports
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";

import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

import { UserContext } from "../../context/UserContext"
import { ClientsDetailInterventions } from '../../components/Clients/ClientsDetailInterventions'

import { MaterielTableList } from '../../components/Materiels/TableList'
import { DataTableDynamic } from '../../components/Generic/TableList'
import Loader from '../../components/Loader'

import {materielFields, interventionFields} from '../../fields/Fields_definition'


const ClientsDetailsScreen = (props) => {
  let { clientId } = useParams();
  console.log(useHistory())
  const [userContext, setUserContext] = useContext(UserContext)
  const [clientIdparam, setClientIdParam] = useState(clientId);
  const [client, setClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientValues, setClientValues] = useState(null);
  const [newClientValues, setNewClientValues] = useState(null)
  const [interventionsTableData, setInterventionsTableData] = useState({});
  const [materielsTableData, setMaterielsTableData] = useState({});
  const [addEditDialog, setAddEditDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const options = {
    center: { lat: 36.890257, lng: 30.707417 },
    zoom: 12
  };
  console.log(props)
  const materielsColumns = [
    { field: 'nomIntervention', header: 'Nom' },
    { field: 'typeIntervention', header: 'Type' },
    { field: 'dateIntervention', header: 'Date' },
    { field: 'statutIntervention', header: 'Statut' }
  ];
  const interventionsColumns = [
    { field: 'nomIntervention', header: 'Nom' },
    { field: 'typeIntervention', header: 'Type' },
    { field: 'dateIntervention', header: 'Date' },
    { field: 'statutIntervention', header: 'Statut' }
  ];

 /* let materielFields = {
    _id: null,
    firstName: '',
    lastName: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };*/
  useEffect(() => {
    //process.env.REACT_APP_API_ENDPOINT + 
    fetch("/clients/getclientbyid", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: clientIdparam }),
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setClientValues(data)
        const interventions = data.interventions;
        setInterventionsTableData({ title: 'Interventions', empty: "Aucune(s) intervention(s)", values: [...interventions], columns: [...interventionsColumns] });
        const materiels = data.materiels;
        setMaterielsTableData({ title: 'Materiel', empty: "Aucun(s) matériel(s)", values: [...materiels], columns: [...materielsColumns], fields: [...materielFields], saveDialog });
      } else {
        //setListOfUsers(...data)
      }
    })


  }, [clientIdparam])

  console.log(clientValues)



  const onInputChange = (e, name) => {
    /*const val = (e.target && e.target.value) || '';
    let _client = { ...client };
    _client[`${name}`] = val;*/

    //setClient(_client);
  }
  const openAddEditDialog = () => {
   // setClient(emptyClient);
    setSubmitted(false);
   setAddEditDialog(true);
}
  const hideDialog = () => {
    setSubmitted(false);
    setAddEditDialog(false);
  }
  const saveDialog = () => {
    setSubmitted(false);
    setAddEditDialog(false);
  }
  const _toggleEditMode = () => {
    setNewClientValues(clientValues)
    setDisabled(!disabled)
  }
  const saveClient = () => {

  }
  const addEditDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveDialog} />
    </React.Fragment>
  );
  const leftContents = (
    <React.Fragment>
      <h4>Details client : {clientValues && clientValues.firstName} {clientValues && clientValues.lastName}</h4>
      <span>Société : {clientValues && clientValues.societe}</span>
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
          <Button icon="pi pi-save" label={'Enregistrer'} className="p-button-success mr-2" onClick={saveClient} />
        </React.Fragment>
      }

    </React.Fragment>
  );
  console.log(interventionsTableData)
  //console.log(userContext)
  return clientValues === null ?
    (
      <Loader />
    ) :
    (
      <div className="flex align-items-center py-5 px-3">

        <div className="col-12">

          <div className="card">
            <Toolbar left={leftContents} right={rightContents} style={{ background: 'none' }} />
          </div>
          <div className="grid p-fluid flex-rows">

            <div className="col-12 md:col-12 flex-rowq">
              <div className="cards">
                <div className="col-12 md:col-12">
                  <h4>Details Clients</h4>
                </div>
                <div className="grid p-fluid flex-rows">
                  <div className="col-12 md:col-6">
                    {materielsTableData ?
                      <DataTableDynamic data={materielsTableData} addEditDialog={openAddEditDialog} />
                      : null}
                  </div>
                  <div className="col-12 md:col-6">
                    {interventionsTableData ?
                      <DataTableDynamic data={interventionsTableData} addEditDialog={openAddEditDialog} />
                      : null}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Dialog visible={addEditDialog} style={{ width: '450px' }} header="Client Details" modal className="p-fluid" footer={addEditDialogFooter} onHide={hideDialog}>
          {/*client.image && <img src={`images/client/${client.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={client.image} className="client-image block m-auto pb-3" />*/}
          {/*} <div className="field">
                    <label htmlFor="firstName">Prénom</label>
                    <InputText id="firstName" value={client.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.firstName })} />
                    {submitted && !client.firstName && <small className="p-error">Prénom requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="lastName">Nom</label>
                    <InputText id="lastName" value={client.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.lastName })} />
                    {submitted && !client.lastName && <small className="p-error">Nom requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={client.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>*/}


        </Dialog>
      </div>

    )

}

export default ClientsDetailsScreen