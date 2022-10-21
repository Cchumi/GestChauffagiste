import React, { useContext, useEffect, useState, useRef} from 'react';
import { UserContext } from '../../context/UserContext';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toolbar } from 'primereact/toolbar';
import { FileUpload } from 'primereact/fileupload';
export const SettingsSociete = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    //console.log(userContext)
    const { societe } = userContext.details;
   // console.log(societe)
    const [societeValues, setSocieteValues] = useState(societe);
    const [newSocieteValues, setNewSocieteValues] = useState(societe)
    const [inputGroupValue, setInputGroupValue] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const toast = useRef(null);
    const baptismFileUploadRef = useRef(null);
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
    const getFiles = (event) => {
        console.log(event)
        console.log(event.files)
    }

    const chooseOptions = {label: 'Choisir'/*, icon: 'pi pi-fw pi-plus'*/};
const uploadOptions = { icon: 'pi pi-upload', className: 'p-button-success'};
const cancelOptions = {label: 'Annuler', icon: 'pi pi-times', className: 'p-button-danger'};
    /* useEffect=(()=> {
 
     }, [userContext])*/
    const saveSociete = () => {
        console.log("SAVE SOCIETE");
        console.log(newSocieteValues)
        // fetch(process.env.REACT_APP_API_ENDPOINT + "clients/add", {
        fetch("/gestapi/users/updateSociete", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSocieteValues),
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
    const _toggleEditMode = () => {
        setNewSocieteValues(societe)
        setDisabled(!disabled)
    }

    const _saveSociete = () => {
        //setNewSocieteValues(societe)
        saveSociete();
        setDisabled(!disabled)
    }
    const onBaptismCertificateUploadAuto = ({ files, options }) => {
        const [file] = files;
        console.log(files)
        console.log(options)
        //dispatch(uploadParishionerBaptismCertificate(parishioner.id, file));
        //baptismFileUploadRef.current.clear();
        baptismFileUploadRef.current.clear();
      };
    const leftContents = (
        <React.Fragment>
            <h5>Détails Société : <span style={{fontWeight: '800'}}>{societe.societeName}</span></h5>
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
                    <Button icon="pi pi-save" label={'Enregistrer'} className="p-button-success mr-2" onClick={_saveSociete} />
                </React.Fragment>
            }

        </React.Fragment>
    );
    return (
        <div className="flex align-items-center py-5 px-3">

            <div className="col-12">

                <div className="cards">
                    
                    {(userContext.details.role === "super-admin" || userContext.details.role === "societe-admin") &&
                        <Toolbar left={leftContents} right={rightContents} style={{background: 'none'}} />
                    }
                    <div className="grid p-fluid">

                        <div className="col-12 md:col-6">
                            <div className="formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="directorFirstName">Nom Societe</label>
                                    <InputText id="directorFirstName" type="text" placeholder="Nom Societe" disabled={disabled} value={newSocieteValues.societeName || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, societeName: e.currentTarget.value })} />
                                </div>
                                <div className="field  col-12 md:col-6">
                                    <label htmlFor="directorFirstName">Prénom Dirigeant</label>
                                    <InputText id="directorFirstName" type="text" placeholder="Prénom Dirigeant" disabled={disabled} value={newSocieteValues.directorFirstName || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, directorFirstName: e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1) })} />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="directorFirstName">Nom Dirigeant</label>
                                    <InputText id="directorFirstName" type="text" placeholder="Nom Dirigeant" disabled={disabled} value={newSocieteValues.directorLastName || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, directorLastName: e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1) })} />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="email">E-Mail</label>
                                    <InputText id="email" type="text" placeholder="E-Mail" disabled={disabled} value={newSocieteValues.email || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, email: e.currentTarget.value })} />
                                </div>
                            </div>

                        </div>
                        <div className="col-12 md:col-6 ">
                            <div className="formgrid grid">
                                <div className="field  col-12 md:col-6">
                                    <label htmlFor="address1">Rue</label>
                                    <InputText id="address1" type="text" placeholder="Rue" disabled={disabled} value={newSocieteValues.address1 || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, address1: e.currentTarget.value })} />
                                </div>
                                <div className="field  col-12 md:col-6">
                                    <label htmlFor="address2">Complément d'adresse</label>
                                    <InputText id="address2" type="text" placeholder="Complément d'adresse" disabled={disabled} value={newSocieteValues.address2 || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, address2: e.currentTarget.value })} />
                                </div>
                                <div className="field  col-12 md:col-2">
                                    <label htmlFor="code_postal">Code Postal</label>
                                    <InputText id="code_postal" type="text" placeholder="Code Postal" disabled={disabled} value={newSocieteValues.code_postal || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, code_postal: e.currentTarget.value })} />
                                </div>
                                <div className="field  col-12 md:col-4">
                                    <label htmlFor="city">Ville</label>
                                    <InputText id="city" type="text" placeholder="Ville" disabled={disabled} value={newSocieteValues.city || ''} onChange={(e) => setNewSocieteValues({ ...newSocieteValues, city: e.currentTarget.value })} />
                                </div>
                                <div className="field  col-12 md:col-6">
                                <label htmlFor="logo">Logo</label>
                                {disabled}
                                <FileUpload id="logo" mode="basic"  disabled={disabled}  name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={onUpload} /*chooseOptions={chooseOptions}*/ chooseLabel="Choisir" onSelect={(event)=>getFiles(event)} 
                                uploadOptions={uploadOptions}
                                customUpload
                                uploadHandler={onBaptismCertificateUploadAuto}
                                ref={baptismFileUploadRef}
                                />      
                                    {/*<FileUpload id="logo" name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}  chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
