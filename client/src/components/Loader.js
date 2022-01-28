import { ProgressSpinner } from 'primereact/progressspinner';
import React from "react"

const Loader = () => {
  return (
    <div className="loader h-screen w-screen flex-autos flex justify-content-center align-items-center">
      <ProgressSpinner size={50} />
    </div>
  )
}

export default Loader