import React, { createContext, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'
//import { UserInterface } from '../Interfaces/Interfaces'

export const myContext = createContext();
export default function Context(props) {
  const [user, setUser] = useState()
  useEffect(() => {
    console.log("CTX")
    Axios.get("http://localhost:4000/api/auth/user", { withCredentials: true }).then((res) => {
      setUser(res.data);
    })
  }, []);

  return (
    <myContext.Provider value={user}>{props.children}</myContext.Provider>
  )
}