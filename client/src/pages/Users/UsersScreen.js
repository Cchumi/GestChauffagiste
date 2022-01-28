import "./UsersScreen.css";
import React, { useEffect, useState, useCallback, useContext } from 'react';
import Axios from "axios";
//Route Imports
import { Link, browserHistory, useHistory } from "react-router-dom";

//Prime Imports
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { UserContext } from "../../context/UserContext"
import { UsersListTable } from '../../components/Users/UsersListTable'
//import { ClientsLayout } from '../../components/Clients/ClientsLayout';

const UsersScreen = () => {
  const [userContext, setUserContext] = useContext(UserContext)
  const [listOfUsers, setListOfUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(userContext)

  const verifyUsers = useCallback(() => {
    //process.env.REACT_APP_API_ENDPOINT + 
    fetch("users/getall", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setListOfUsers(data)
      } else {
        //setListOfUsers(...data)
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUsers, 20 * /*60 **/ 1000)
    })
  }, [setListOfUsers])

  useEffect(() => {
    verifyUsers()
  }, [verifyUsers])
  //console.log(userContext)
  return (
    <div>
      {/*<h2 className="mt-0 mb-3 text-5xl text-900 text-center p-4 text-white">Mes Clients</h2>*/}
      <div className="grid">
        <div className="col-12 md:col-12">
          <UsersListTable users={listOfUsers} />
        </div>
      </div>

    </div >
  );
}

export default UsersScreen