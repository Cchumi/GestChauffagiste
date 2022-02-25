import React, { useState, useEffect, useRef } from 'react';

import { Redirect, useHistory } from 'react-router-dom'
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';

import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Ripple } from 'primereact/ripple';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
//import { CustomerService } from '../service/CustomerService';
import { OverlayPanel } from 'primereact/overlaypanel';
import { GMap } from 'primereact/gmap';

//import './css/ClientsListTable.css';

export const ClientsListTable = ({ clientsData, addClient, history }) => {
    //console.log(users)
    //const history = useHistory();
    let emptyClient = {
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
    };
    const [customers1, setCustomers1] = useState(null);
    const [clients, setClients] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientDialog, setClientDialog] = useState(false);
    const [client, setClient] = useState(emptyClient);
    const [submitted, setSubmitted] = useState(false);
    const [deleteProductDialog, setDeleteClientDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const toast = useRef(null);


    // const [filters1, setFilters1] = useState(null);
    const [filters2, setFilters2] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'username': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS },
        '': { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    //const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');
    //const [loading1, setLoading1] = useState(true);
    const [loadingClients, setLoadingClients] = useState(true);
    const representatives = [
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

    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];

    //const customerService = new CustomerService();
    const openMap = useRef(null);
    useEffect(() => {
        console.log(clientsData)
        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        //customerService.getCustomersLarge().then(data => { setClients(getCustomers(data)); setLoadingClients(false) });
        setClients(clientsData);
        setLoadingClients(false);
        // initFilters1();
    }, [clientsData]); // eslint-disable-line react-hooks/exhaustive-deps

    const getClientData = () => {
        //getuserbyid
        console.log(selectedClient)
        history.push(`/clients/${selectedClient._id}`)
       /* return (
            <Redirect
                to={`/clients/${selectedClient._id}`}
            />
        );*/
    }

    const openNew = () => {
        setClient(emptyClient);
        setSubmitted(false);
        setClientDialog(true);
    }
    const hideDialog = () => {
        setSubmitted(false);
        setClientDialog(false);
    }

    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
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
            'username': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            'firstName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            'lastName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            /* 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
             'representative': { value: null, matchMode: FilterMatchMode.IN },
             'status': { value: null, matchMode: FilterMatchMode.EQUALS },
             'verified': { value: null, matchMode: FilterMatchMode.EQUALS }*/
        });
        setGlobalFilterValue2('');
    }


    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2['global'].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    }



    const renderHeaderClients = () => {
        return (
            <div className="flex justify-content-between p-ai-center filter-field lg:flex-row flex-column" >
                <div>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Recherche" />
                    </span>
                    <Button type="button" icon="pi pi-filter-slash" label="Effacer" className="p-button-outlined" onClick={clearFilter2} />
                </div>
                <div>
                    <Button type="button" icon="pi pi-plus-circle" label="Nouveau Client" className="p-button-outlined" onClick={openNew} />
                </div>

            </div>
        )
    }


    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }




    /* const deleteProductDialogFooter = (
         <React.Fragment>
             <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
             <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
         </React.Fragment>
     );
     const deleteProductsDialogFooter = (
         <React.Fragment>
             <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
             <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
         </React.Fragment>
     );*/


    const hideDeleteProductDialog = () => {
        setDeleteClientDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (client.firstName.trim()) {
            let _clients = [...clients];
            let _client = { ...client };
            if (client.id) {
                const index = findIndexById(client.id);

                _clients[index] = _client;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
            }
            else {
                _client.id = createId();
                _client.image = 'client-placeholder.svg';
                _clients.push(_client);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
            }
            addClient(_client)
            setClients(_clients);
            setClientDialog(false);
            setClient(emptyClient);
        }
    }
    const onCategoryChange = (e) => {
        let _client = { ...client };
        _client['category'] = e.value;
        setClient(_client);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _client = { ...client };
        _client[`${name}`] = val;

        setClient(_client);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _client = { ...client };
        _client[`${name}`] = val;

        setClient(_client);
    }

    const editClient = (client) => {
        setClient({ ...client });
        setClientDialog(true);
    }

    const confirmDeleteClient = (client) => {
        setClient(client);
        setDeleteClientDialog(true);
    }

    const deleteClient = () => {
        let clients = clients.filter(val => val.id !== clients.id);
        setClients(clients);
        setDeleteClientDialog(false);
        setClient(emptyClient);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    const items = [
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
    const save = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }
    const actionBodyTemplates = () => {
        return (
            <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items}></SplitButton>
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
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editClient(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteClient(rowData)} />
            </React.Fragment>
        );
    }
    const verifiedRowFilterTemplate = (options) => {
        return null
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;


    const clientDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    //const header1 = renderHeader1();
    const headerClients = renderHeaderClients();

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

            <div className="card" >
                <h5>Vos Clients</h5>
                <div style={{ height: 'calc(100vh - 250px)' }}>
                    <DataTable value={clients}
                        paginator //className="p-datatable p-datatable-customers" //rows={100}
                        scrollable
                        reflow="true"
                        scrollHeight="flex"
                        // paginatorTemplate="template1"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Afficher {first} sur {last} de {totalRecords}" rows={50} rowsPerPageOptions={[10, 20, 50]}
                        paginatorLeft={paginatorLeft}
                        paginatorRight={paginatorRight}
                        dataKey="id"
                        filters={filters2}
                        filterDisplay="row"
                        loading={loadingClients}
                        responsiveLayout="stack"

breakpoint="760px"

                        globalFilterFields={['username', 'firstName', 'lastName', 'status']}
                        header={headerClients}
                        emptyMessage="No customers found."
                        column="test"
                        //onRowClick={()=> {alert('ok')}}
                        onRowDoubleClick={() => { getClientData() }}
                        rowHover
                        showGridlines
                        showAddButton
                        selectionMode="single" selection={selectedClient} onSelectionChange={e => setSelectedClient(e.value)}
                        dataKey="_id"
                    >
                        <Column field="_id" hidden />
                        <Column field="firstName" header="Prénom" filter filterPlaceholder="Recherche par prénom" sortable /*style={{ minWidth: '12rem' }}*/ />
                        <Column field="lastName" header="Nom" filter filterPlaceholder="Recherche par nom" sortable /*style={{ minWidth: '12rem' }}*/ />
                        <Column field="societe" header="Société" filter filterPlaceholder="Recherche par société" sortable /*style={{ minWidth: '12rem' }}*/ />
                        {/* <Column header="Country" filterField="country.name" sortable style={{ justifyContent: 'space-between' }} body={countryBodyTemplate} filter filterPlaceholder="Recherche par pays" />
                    <Column header="Agent" filterField="representative" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}
                        filter filterElement={representativeRowFilterTemplate} />
                    <Column field="status" header="Status" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    <Column field="verified" header="Verified" sortable dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />*/}
                        <Column header="Action" headerStyle={{ minWidth: "10vw", textAlign: 'center' }} bodyStyle={{ minWidth: "10vw", textAlign: 'center', overflow: 'visible', justifyContent: 'flex-end' }} body={actionBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
                    </DataTable>
                </div>
            </div>
            <Dialog visible={clientDialog} style={{ width: '450px' }} header="Client Details" modal className="p-fluid" footer={clientDialogFooter} onHide={hideDialog}>
                {client.image && <img src={`images/client/${client.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={client.image} className="client-image block m-auto pb-3" />}
                <div className="field">
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
                </div>

                <div className="field">
                    <label className="mb-3">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={client.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={client.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={client.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={client.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={client.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={client.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}


