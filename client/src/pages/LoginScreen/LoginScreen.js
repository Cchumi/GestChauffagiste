import "./LoginScreen.css";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
//Route Imports
import { Link, browserHistory, useHistory } from "react-router-dom";

//Prime Imports
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { UserContext } from "../../context/UserContext"
const LoginScreen = () => {
  const [userContext, setUserContext] = useContext(UserContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(userContext)
  const formSubmitHandler = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."
    //let data = null
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async response => {
        console.log('test')
        console.log(response)
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
          } else {
            setError(genericErrorMessage)
          }
        } else {
          //response.json().then(data => {
          // do something with your data

          const data = await response.json();
          //console.log(data);
          //setTimeout(() => {
          //console.log(data);
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
          // }, 6000)
          //const resdata = await response.json();
          //console.log(resdata)
          //return resdata//await response.json();

        }
      })/*.then(data => {
        //console.log('new then')
        //console.log(data)
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      })*/
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
  }
  //console.log(userContext)
  return (
    <div className="cards surfaces-card shadow-5 p-6 border-round fadein animation-duration-1000 flex-auto lg:flex-grow-1 glass-card"
    //style={{flex: '0 0 100%'}}

    >
      <h2 className="mt-0 mb-3 text-5xl text-900 text-center p-4 text-white">Gest Bouhet</h2>
      <h2 className="mt-0 mb-3 text-4xl text-900 text-center p-4  text-white"><i className="pi pi-user mt-0 mb-3 text-900 text-center p-8  text-white login-form-user" ></i></h2>
      <form onSubmit={formSubmitHandler} className="p-fluid">
        <div className="p-fluid">
          <div className="p-field ">

            <InputText className="login-form-input" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Compte" />

          </div>
          <div className="login-form-between-padding"></div>
          <div className="p-field">
            <Password className="login-form-input" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />

            <div className="p-field  text-center" style={{}}>
              {error ? (
                <small id="login-help" className="text-white text-lg">{error}</small>
              ) : null}
            </div>
          </div>
          <div className="login-form-between-padding"></div>
          <div className="p-field">
            <Button
              label={`${isSubmitting ? "Connexion en cours" : "Se Connecter"}`}
              className="login-form-btn"
              loading={isSubmitting}
            // onClick={() => formSubmitHandler()}
            />
          </div>
          <div className="p-field p-4 text-center" style={{}}>
            <Link
              className="text-white text-2xl"
              style={{
                display: "block",
                margin: "1rem 0",
                textDecoration: "underline"
              }}
              to={`/register`}
            >
              Pas encore inscrit ?
            </Link>
            <span className="text-white text-lg">ou</span>
            <Link
              className="text-white text-2xl"
              style={{
                display: "block",
                margin: "1rem 0",
                textDecoration: "underline"
              }}
              to={`/resetpassword`}
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
      </form>
    </div >
  );
}

export default LoginScreen