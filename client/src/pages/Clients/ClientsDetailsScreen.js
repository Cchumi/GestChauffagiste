import "./ClientsScreen.css";
import React, { useEffect, useState, useCallback, useContext } from 'react';
import Axios from "axios";
//Route Imports
import { Link, browserHistory, useHistory, useParams } from "react-router-dom";

//Prime Imports
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { UserContext } from "../../context/UserContext"
import { ClientsListTable } from '../../components/Clients/ClientsListTable'
import { ClientsLayout } from '../../components/Clients/ClientsLayout';
import Loader from '../../components/Loader'
const ClientsDetailsScreen = (props) => {
  let { clientId } = useParams();
  const [userContext, setUserContext] = useContext(UserContext)
  const [clientIdparam, setClientIdParam] = useState(clientId);
  const [client, setClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(clientId)

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
        setClient(data)
      } else {
        //setListOfUsers(...data)
      }
    })


  }, [clientIdparam])

  console.log(client)
  //console.log(userContext)
  return client === null ?
    (
      <Loader />
    ) :
    (
      <div>
        {/*<h2 className="mt-0 mb-3 text-5xl text-900 text-center p-4 text-white">Mes Clients</h2>*/}
        <div className="grid">
          <div className="col-12 md:col-12">
            <h4>Details client : {client.firstName} {client.lastName}</h4>
            <span>Société : {client.societe}</span>
          </div>
        </div>

      </div >
    );
}

export default ClientsDetailsScreen