import React, { useState, useEffect, useRef } from 'react';

import { Redirect, useHistory } from 'react-router-dom'
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';

import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Ripple } from 'primereact/ripple';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';
//import { CustomerService } from '../service/CustomerService';
import { OverlayPanel } from 'primereact/overlaypanel';
import { GMap } from 'primereact/gmap';

//import './css/ClientsListTable.css';

export const UsersListTable = ({ currentUser, users, addItem, deleteItem, _onRefresh }) => {

    const history = useHistory();
    let emptyItem = {
        _id: null,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        role: 'user',
        confirmPassword: '',
        societe: currentUser.societe._id
    };
    const selectButtonRoles = [
        { name: 'Administrateur', code: 'admin' },
        { name: 'Utilisateur', code: 'user' },
        { name: 'Client', code: 'client' },
    ];
    //console.log(emptyItem)
    const [customers1, setCustomers1] = useState(null);
    const [items, setItems] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [item, setItem] = useState(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [roleOption, setRoleOption] = useState(selectButtonRoles[1])
    const toast = useRef(null);
    // console.log(selectButtonRoles[1])
    // const [filters1, setFilters1] = useState(null);
    const [filters2, setFilters2] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'userName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS },
        '': { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    //const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');
    //const [loading1, setLoading1] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    /* const representatives = [
         { name: "Amy Elsner", image: 'amyelsner.png' },
         { name: "Anna Fali", image: 'annafali.png' },
         { name: "Asiya Javayant", image: 'asiyajavayant.png' },
         { name: "Bernardo Dominic", image: 'bernardodominic.png' },
         { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
         { name: "Ioni Bowcher", image: 'ionibowcher.png' },
         { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
         { name: "Onyama Limba", image: 'onyamalimba.png' },
         { name: "Stephen Shaw", image: 'stephenshaw.png' },
         { name: "XuXue Feng", image: 'xuxuefeng.png' }
     ];
 
     const selectButtonValues1 = [
         { name: 'Option 1', code: 'O1' },
         { name: 'Option 2', code: 'O2' },
         { name: 'Option 3', code: 'O3' },
     ];
 */
    /*  const statuses = [
          'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
      ];*/

    //const customerService = new CustomerService();
    const openMap = useRef(null);
    useEffect(() => {
        //console.log(users)
        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        //customerService.getCustomersLarge().then(data => { setItems(getCustomers(data)); setLoadingClients(false) });
        setItems(users);
        setLoadingUsers(false);
        // initFilters1();
    }, [users]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setItem({ ...item, role: roleOption.code })
    }, [roleOption]);

    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const getItemData = () => {
        //getuserbyid
        console.log(selectedItem)
        setItem(selectedItem);
        setSubmitted(false);
        setAddDialog(true);
        // history.push(`/settings/utilisateurs/${selectedItem._id}`)
        //setAddDialog(true)
    }

    const formatDate = (value) => {
        return value.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }

    /* const clearFilter1 = () => {
         initFilters1();
     }*/
    const clearFilter2 = () => {
        setFilters2({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'userName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            'firstName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            'lastName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            /* 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
             'representative': { value: null, matchMode: FilterMatchMode.IN },
             'status': { value: null, matchMode: FilterMatchMode.EQUALS },
             'verified': { value: null, matchMode: FilterMatchMode.EQUALS }*/
        });
        setGlobalFilterValue2(null);
    }
    /* const onGlobalFilterChange1 = (e) => {
         const value = e.target.value;
         let _filters1 = { ...filters1 };
         _filters1['global'].value = value;
 
         setFilters1(_filters1);
         setGlobalFilterValue1(value);
     }*/

    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2['global'].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    /*  const initFilters1 = () => {
          setFilters1({
              'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
              'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
              'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
              'representative': { value: null, matchMode: FilterMatchMode.IN },
              'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
              'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
              'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
              'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
              'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
          });
          setGlobalFilterValue1('');
      }*/

    /*  const renderHeader1 = () => {
          return (
              <div className="p-d-flex p-jc-between p-ai-center filter-field" >
                  <span className="p-input-icon-left">
                      <i className="pi pi-search" />
                      <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Recherche" />
                  </span>
                  <Button type="button" icon="pi pi-filter-slash" label="Effacer" className="p-button-outlined" onClick={clearFilter1} />
              </div>
          )
      }*/

    const renderHeader = () => {
        return (
            <div className="grid p-fluid justify-content-between">

                {/*<div className="flex justify-content-between flex-column md:flex-row p-ai-center filter-field" >*/}
                <div className="col-12 md:col-2">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Recherche" />
                        <Button icon="pi pi-times" className="p-button-outlined" onClick={clearFilter2} />
                    </div>
                </div>
                <div className="col-12 md:col-2 text-right">
                    <div>
                        <Button type="button" icon="pi pi-plus-circle" label="Nouvel utilisateur" className="p-button-outlined" onClick={openNew} />
                    </div>
                    {/*</div>*/}
                </div>
            </div>
        )
    }


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClickCapture={_onRefresh} />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const actionItems = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: (e) => {
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: (e) => {
                toast.current.show({ severity: 'info', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: (e) => {
                window.location.href = 'https://facebook.github.io/react/'
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: (e) => {
                window.location.hash = "/fileupload"
            }
        }
    ]
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    const save = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Données enregistrées' });
    }
    const openNew = () => {
        setItem(emptyItem);
        //setRoleOption(selectButtonRoles.filter(x => x.code === emptyItem.role));
        console.log(roleOption)
        setSubmitted(false);
        setAddDialog(true);
    }
    const hideDialog = () => {
        setSubmitted(false);
        setAddDialog(false);
        setEditDialog(false);
    }

    const saveItem = () => {
        setSubmitted(true);

        if (item.firstName.trim()) {
            let _items = [...items];
            let _item = { ...item };
            if (item.id) {
                const index = findIndexById(item.id);

                _items[index] = _item;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Utilisateur mis à jour', life: 3000 });
            }
            else {
                _item.id = createId();
                _item.image = 'client-placeholder.svg';
                _items.push(_item);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Utilisateur crée', life: 3000 });
            }
            addItem(_item)
            setItems(_items);
            setAddDialog(false);
            setItem(emptyItem);
        }
    }
    const onCategoryChange = (e) => {
        let _item = { ...item };
        _item['category'] = e.value;
        setItem(_item);
    }
    //console.log(item)
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        console.log(val)
        let _item = { ...item };
        if (name === "role") {
            var roleTerm = selectButtonRoles.filter(x => x.code === val.code);
            //console.log(roleTerm)
            _item[`${name}`] = val.code;
        }
        else {
            _item[`${name}`] = val;
        }


        setItem(_item);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _item = { ...item };
        _item[`${name}`] = val;

        setItem(_item);
    }
    const editItem = (item) => {

        setItem({ ...item });
        setEditDialog(true);
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteDialog(true);
    }

    const deleteUser = () => {
        deleteItem(item)
        setDeleteDialog(false);
    }
    const actionBodyTemplates = () => {
        return (
            <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={actionItems}></SplitButton>
        )
        /* return (
             <div className="flex">
                    <Button type="button" icon="pi pi-pencil" className="flex-initial flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 px-2 py-2 border-round"></Button>
                    <Button type="button" icon="pi pi-cog" className="flex-initial flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 px-2 py-2 border-round"></Button>
                </div>
                )*/
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className='justify-content-between'>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteItem(rowData)} />
            </div>
        );
    }
    const verifiedRowFilterTemplate = (options) => {
        return null
    }
    const dialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            {addDialog ?
                <Button label={"Ajouter"} icon="pi pi-check" className="p-button-text" onClick={saveItem} />
                :
                <Button label={"Mettre à jour"} icon="pi pi-check" className="p-button-text" onClick={saveItem} />
            }
        </React.Fragment>
    );
    //const header1 = renderHeader1();
    const header = renderHeader();
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Annuler" icon="pi pi-times" onClick={() => setDeleteDialog(false)} className="p-button-text" />
            <Button type="button" label="Oui" icon="pi pi-check" onClick={() => deleteUser()} className="p-button-text" autoFocus />
        </>
    );
    return (
        <div className="datatable-filter-demo">
            <Toast ref={toast} />
            {/*<div className="card">
                <h5>Filter Menu</h5>
                <p>Filters are displayed in an overlay.</p>
                <DataTable value={customers1} paginator className="p-datatable-customers" showGridlines rows={100}
                    dataKey="id" filters={filters1} filterDisplay="menu" loading={loading1} responsiveLayout="scroll"
                    globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']} header={header1} emptyMessage="Aucun client trouvé.">
                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country"
                        filterClear={filterClearTemplate} filterApply={filterApplyTemplate} filterFooter={filterFooterTemplate} />
                    <Column header="Agent" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem'}} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}
                        filter filterElement={representativeFilterTemplate} />
                    <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />
                    <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                    <Column field="verified" header="Verified" dataType="boolean" bodyClassName="p-text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                </DataTable>
    </div>*/}

            <div className="card py-5" >
                <h5>Vos Utilisateurs</h5>
                <div
                //style={{ height: 'calc(100vh - 250px)' }}
                >
                    <DataTable
                        value={items}
                        paginator
                        //className="p-datatable p-datatable-customers" //rows={100}
                        //scrollable
                        //reflow="true"
                        //scrollHeight="flex"
                        // paginatorTemplate="template1"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Afficher {first} sur {last} de {totalRecords}" rows={50} rowsPerPageOptions={[10, 20, 50]}
                        paginatorLeft={paginatorLeft}
                        paginatorRight={paginatorRight}
                        filters={filters2}
                        filterDisplay="menu"
                        loading={loadingUsers}
                        responsiveLayout="stack"
                        breakpoint="960px"
                        globalFilterFields={['userName', 'firstName', 'lastName', 'status']}
                        header={header}
                        emptyMessage="No customers found."
                        column="test"
                        //onRowClick={()=> {alert('ok')}}
                        onRowDoubleClick={() => { getItemData() }}
                        rowHover
                        showGridlines
                        showAddButton
                        selectionMode="single" selection={selectedItem} onSelectionChange={e => setSelectedItem(e.value)}
                        dataKey="_id"
                    >
                        <Column field="_id" hidden />
                        <Column field="userName" header="Utilisateur" filter filterPlaceholder="Recherche par utilisateur" sortable style={{ minWidth: '12rem' }} />
                        <Column field="role" header="Role" filter filterPlaceholder="Recherche par Role" sortable style={{ maxWidth: '8rem' }} />
                        <Column field="firstName" header="Prénom" filter filterPlaceholder="Recherche par prénom" sortable style={{ minWidth: '12rem' }} />
                        <Column field="lastName" header="Nom" filter filterPlaceholder="Recherche par nom" sortable style={{ minWidth: '12rem' }} />
                        {/* <Column header="Country" filterField="country.name" sortable style={{ justifyContent: 'space-between' }} body={countryBodyTemplate} filter filterPlaceholder="Recherche par pays" />
                    <Column header="Agent" filterField="representative" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}
                        filter filterElement={representativeRowFilterTemplate} />
                    <Column field="status" header="Status" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    <Column field="verified" header="Verified" sortable dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />*/}
                        <Column header="Action" body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
            <Dialog visible={addDialog | editDialog ? true : false} style={{ width: '450px' }} header={addDialog ? "Nouvel utilisateur" : "Détail utilisateur"} modal className="p-fluid" footer={dialogFooter} onHide={hideDialog}>
                {item.image && <img src={`images/client/${item.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.image} className="client-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="firstName">Prénom</label>
                    <InputText id="firstName" value={item.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.firstName })} />
                    {submitted && !item.firstName && <small className="p-error">Prénom requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="lastName">Nom</label>
                    <InputText id="lastName" value={item.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.lastName })} />
                    {submitted && !item.lastName && <small className="p-error">Nom requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="userName">userName</label>
                    <InputText id="userName" value={item.userName} onChange={(e) => onInputChange(e, 'userName')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.userName })} />
                    {submitted && !item.userName && <small className="p-error">Nom d'utilisateur requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">email</label>
                    <InputText id="email" value={item.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.email })} />
                    {submitted && !item.email && <small className="p-error">Email requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="password">Mot de passe</label>
                    <InputText id="password" value={item.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.password })} />
                    {submitted && !item.password && <small className="p-error">Mot de passe requis.</small>}
                </div>
                <div className="field">
                    <label htmlFor="confirmPassword">Confirmation mot de passe</label>
                    <InputText id="confirmPassword" value={item.confirmPassword} onChange={(e) => onInputChange(e, 'confirmPassword')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.confirmPassword })} />
                    {submitted && !item.confirmPassword && <small className="p-error">Confirmation mot de passe requise.</small>}
                </div>
                <div className="field">
                    <label htmlFor="role">Role</label>
                    <SelectButton value={roleOption} onChange={(e) => { setRoleOption(e.value); console.log(e.value) }} /*onChange={(e) => onInputChange(e, 'role')}*/ options={selectButtonRoles} optionLabel="name" />
                </div>
                {/*<div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={item.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={item.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={item.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={item.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={item.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={item.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={item.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>*/}
            </Dialog>
            <Dialog header="Confirmation" visible={deleteDialog} onHide={() => setDeleteDialog(false)} style={{ maxWidth: '550px' }} modal footer={confirmationDialogFooter}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Êtes vous sûre de vouloir supprimer cet utilisateur ?</span>
                </div>
            </Dialog>
        </div>
    );
}


