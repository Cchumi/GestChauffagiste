import "./RegisterScreen.css";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
//Route Imports
import { Link, browserHistory, useHistory } from "react-router-dom";
import { Password } from 'primereact/password';
//Prime Imports
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { UserContext } from "../../context/UserContext"

export default function RegisterScreen({ setLoggedInState, setState }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)

  const formSubmitHandler = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."
//    fetch(process.env.REACT_APP_API_ENDPOINT + "users/signup", {
    fetch("/users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
          } else if (response.status === 500) {
            console.log(response)
            const data = await response.json()
            if (data.message) setError(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await response.json()
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
  }
  return (
    <div className="cards surfaces-card shadow-5 p-6 border-round fadein animation-duration-1000 flex-auto lg:flex-grow-1 glass-card"
    //style={{flex: '0 0 100%'}}
    >
      <h2 className="mt-0 mb-3 text-5xl text-900 text-center p-4 text-white">Gest Bouhet</h2>
      <h2 className="mt-0 mb-3 text-4xl text-900 text-center p-4  text-white"><i className="pi pi-user mt-0 mb-3 text-900 text-center p-8  text-white login-form-user" ></i></h2>
      <form onSubmit={formSubmitHandler} className="p-fluid">
      <div className="p-fluid">
        <div className="p-field ">
          <InputText className="login-form-input" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Compte" />
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
        <div className="p-field ">
          <InputText className="login-form-input" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nom utilisateur" />
        </div>
        <div className="login-form-between-padding"></div>
        <div className="login-form-between-padding"></div>
        <div className="p-field ">
          <InputText className="login-form-input" id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" />
        </div>
        <div className="login-form-between-padding"></div>
        <div className="p-field ">
          <InputText className="login-form-input" id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value )} placeholder="Nom" />
        </div>
        <div className="login-form-between-padding"></div>
        <div className="p-field">
          <Button
            label={`${isSubmitting ? "Création en cours" : "Creer un compte"}`}
            className="login-form-btn"
            type="submit"
            loading={isSubmitting}
            //onClick={() => onRegisterBtnClicked()}
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
            to={`/`}
          >
            <i className="pi pi-arrow-left p-2"></i>
            Retour à la connexion
          </Link>
        </div>
        
      </div>
      </form>
    </div >
  );
}
