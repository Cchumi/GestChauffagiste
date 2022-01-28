import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
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

export const UsersListTable = ({ users }) => {
    //console.log(users)
    const [customers1, setCustomers1] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
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
        console.log(users)
        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        //customerService.getCustomersLarge().then(data => { setClients(getCustomers(data)); setLoadingClients(false) });
        setAllUsers(users);
        setLoadingClients(false);
        // initFilters1();
    }, [users]); // eslint-disable-line react-hooks/exhaustive-deps


    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const getUserData = () => {
        //getuserbyid
        console.log(selectedUser)
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

    const renderHeaderClients = () => {
        return (
            <div className="flex justify-content-between p-ai-center filter-field" >
                <div>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Recherche" />
                    </span>
                    <Button type="button" icon="pi pi-filter-slash" label="Effacer" className="p-button-outlined" onClick={clearFilter2} />
                </div>
                <div>
                    <Button type="button" icon="pi pi-plus-circle" label="Nouvel Utilisateur" className="p-button-outlined" onClick={clearFilter2} />
                </div>

            </div>
        )
    }

    /* const countryBodyTemplate = (rowData) => {
         return (
             <React.Fragment>
                 <img alt="flag" src="assets/demo/images/flags/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                 <span className="image-text">{rowData.country.name} </span>
                 <Button type="button" icon="pi pi-map" className="p-button-outlined" onClick={(e) => openMap.current.toggle(e)} />
                 {<OverlayPanel ref={op} showCloseIcon id="overlay_panel" style={{width: '450px'}} className="overlaypanel-demo">
                     <DataTable value={products} selectionMode="single" paginator rows={5}
                         selection={selectedProduct} onSelectionChange={onProductSelect}>
                         <Column field="name" header="Name" sortable />
                         <Column header="Image" body={imageBody} />
                         <Column field="price" header="Price" sortable body={priceBody} />
                     </DataTable>
                 </OverlayPanel>}
                 <OverlayPanel ref={openMap} showCloseIcon id="overlay_panel" style={{ width: '450px' }} className="overlaypanel-demo">
                     <GMap options={options} style={{ width: '100%', minHeight: '320px' }} />
                 </OverlayPanel>
 
             </React.Fragment>
         );
     }*/

    /* const filterClearTemplate = (options) => {
         return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
     }
 
     const filterApplyTemplate = (options) => {
         return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
     }
 
     const filterFooterTemplate = () => {
         return <div className="p-px-3 p-pt-0 p-pb-3 p-text-center p-text-bold">Customized Buttons</div>;
     }*/

    /* const representativeBodyTemplate = (rowData) => {
         const representative = rowData.representative;
         return (
             <React.Fragment>
                 <img alt={representative.name} src={`images/avatar/${representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                 <span className="image-text">{representative.name}</span>
             </React.Fragment>
         );
     }*/

    /* const representativeFilterTemplate = (options) => {
         return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
     }*/

    /* const representativesItemTemplate = (option) => {
         return (
             <div className="p-multiselect-representative-option">
                 <img alt={option.name} src={`images/avatar/${option.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                 <span className="image-text">{option.name}</span>
             </div>
         );
     }*/

    /* const dateBodyTemplate = (rowData) => {
         return formatDate(rowData.date);
     }*/

    /*const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }*/

    /*const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    }*/

    /* const balanceFilterTemplate = (options) => {
         return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
     }*/

    /* const statusBodyTemplate = (rowData) => {
         return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
     }*/

    /*const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }*/

    /*const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }*/

    /* const activityBodyTemplate = (rowData) => {
         return <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>;
     }*/

    /* const activityFilterTemplate = (options) => {
         return (
             <React.Fragment>
                 <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                 <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                     <span>{options.value ? options.value[0] : 0}</span>
                     <span>{options.value ? options.value[1] : 100}</span>
                 </div>
             </React.Fragment>
         )
     }*/

    /*const verifiedBodyTemplate = (rowData) => {
         return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
     }*/

    /*const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />
    }*/

    /* const representativeRowFilterTemplate = (options) => {
         return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" maxSelectedLabels={1} />;
     }
 
     const statusRowFilterTemplate = (options) => {
         return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
     }
 
     const verifiedRowFilterTemplate = (options) => {
         return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
     }
     const options = {
         center: { lat: 36.890257, lng: 30.707417 },
         zoom: 12
     };*/


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    /*const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Previous</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Next</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText size="2" className="p-ml-1" value={this.state.currentPage} tooltip={this.state.pageInputTooltip}
                        onKeyDown={(e) => this.onPageInputKeyDown(e, options)} onChange={this.onPageInputChange} />
                </span>
            )
        }
    };*/
    /*const template2 = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ];

            return (
                <React.Fragment>
                    <span className="p-mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </React.Fragment>
            );
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        }
    };*/
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
    const actionBodyTemplate = () => {
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
    const verifiedRowFilterTemplate = (options) => {
        return null
    }
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
                <h5>Vos Utilisateurs</h5>
                <div style={{ height: 'calc(100vh - 250px)' }}>
                    <DataTable value={allUsers}
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
                        globalFilterFields={['username', 'firstName', 'lastName', 'status']}
                        header={headerClients}
                        emptyMessage="No customers found."
                        column="test"
                        //onRowClick={()=> {alert('ok')}}
                        onRowDoubleClick={() => { getUserData() }}
                        rowHover
                        showGridlines
                        showAddButton
                        selectionMode="single" selection={selectedUser} onSelectionChange={e => setSelectedUser(e.value)}
                        dataKey="_id"
                    >
                        <Column field="_id" hidden />
                        <Column field="username" header="Utilisateur" filter filterPlaceholder="Recherche par utilisateur" sortable style={{ minWidth: '12rem' }} />
                        <Column field="firstName" header="Prénom" filter filterPlaceholder="Recherche par prénom" sortable style={{ minWidth: '12rem' }} />
                        <Column field="lastName" header="Nom" filter filterPlaceholder="Recherche par nom" sortable style={{ minWidth: '12rem' }} />
                        {/* <Column header="Country" filterField="country.name" sortable style={{ justifyContent: 'space-between' }} body={countryBodyTemplate} filter filterPlaceholder="Recherche par pays" />
                    <Column header="Agent" filterField="representative" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}
                        filter filterElement={representativeRowFilterTemplate} />
                    <Column field="status" header="Status" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    <Column field="verified" header="Verified" sortable dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />*/}
                        <Column header="Action" headerStyle={{ minWidth: "10vw", textAlign: 'center' }} bodyStyle={{ minWidth: "10vw", textAlign: 'center', overflow: 'visible', justifyContent: 'flex-end' }} body={actionBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}


