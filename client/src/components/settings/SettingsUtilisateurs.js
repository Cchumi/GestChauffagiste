import React, { useEffect, useState, useCallback, useContext } from 'react';
import { UserContext } from "../../context/UserContext"
import { UsersListTable } from '../../components/Users/UsersListTable'
export const SettingsUtilisateurs = () => {
    const [userContext, setUserContext] = useContext(UserContext)
    const [listOfUsers, setListOfUsers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //console.log(userContext)
    //var myVar = null;
    const verifyUsers = useCallback(() => {
        //process.env.REACT_APP_API_ENDPOINT + 
        fetch("/users/getallusers", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async response => {
            if (response.ok) {
                const data = await response.json();
                //console.log(data)
                setListOfUsers(data)
            } else {
                //setListOfUsers(...data)
            }
        })
    }, [setListOfUsers])
    useEffect(() => {
        verifyUsers();
        const timer = setInterval(verifyUsers, 20 *  1000)
        return () => { // Return callback to run on unmount.
            window.clearInterval(timer);
        };
    }, []);
    /* useEffect(() => {
       verifyUsers()
       
     }, [verifyUsers])*/
     const addItem = (newItem) => {
        console.log("AJOUT UTILISATEUR");
        console.log(newItem)
       //return;
       // fetch(process.env.REACT_APP_API_ENDPOINT + "clients/add", {
        fetch("/users/adduser", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: {...newItem}, societe: {...userContext.details.societe} }),
        }).then(async response => {
          console.log(response)
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            //setListOfClients(data)
          } else {
            //setListOfUsers(...data)
          }
          // call refreshToken every 5 minutes to renew the authentication token.
          //setTimeout(verifyUsers, 20 * /*60 **/ 1000)
        })
      }

      const deleteItem = (item) => {
        console.log("DELETE ITEM");
        console.log(item)
       // fetch(process.env.REACT_APP_API_ENDPOINT + "clients/add", {
        fetch("/users/deleteuser", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
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
    return (
        <div>
            {/*<h2 className="mt-0 mb-3 text-5xl text-900 text-center p-4 text-white">Mes Clients</h2>*/}
            <div className="grid">
                <div className="col-12 md:col-12">
                    <UsersListTable currentUser={userContext.details} users={listOfUsers}  addItem={addItem} deleteItem={deleteItem} _onRefresh={verifyUsers} />
                </div>
            </div>

        </div >
    )
}
