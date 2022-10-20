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
import { Tooltip } from "primereact/tooltip";
//import { CustomerService } from '../service/CustomerService';
import { OverlayPanel } from 'primereact/overlaypanel';

export const MaterielTableList = ({ materielsData }) => {

    const [selected, setSelected] = useState(null)

    const toast = useRef(null);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" /*onClick={() => editClient(rowData)}*/ />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" /*onClick={() => confirmDeleteClient(rowData)}*/ />
            </React.Fragment>
        );
    }
    const openNew = () => {

    }
    const verifiedRowFilterTemplate = (options) => {
        return null
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between p-ai-center filter-field lg:flex-row flex-column" >
                <div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search" />
                        </span>
                        <InputText placeholder="Recherche" />
                        <Button type="button" icon="pi pi-filter-slash" label="Effacer" className="p-button-outlined" /*onClick={clearFilter2}*/ />
                    </div>
                </div>
                <div>
                    <Button type="button" icon="pi pi-plus-circle" label="Nouveau Materiel" className="p-button-outlined" onClick={openNew} />
                </div>

            </div>
        )
    }
    const header = renderHeader();
    return (

        <div className="datatable-filter-demo">
            <Toast ref={toast} />
            <div style={{ height: 'calc(100vh - 250px)' }}>
                <Tooltip
                    target=".p-dt-tooltip"
                    content="Edit"
                    mouseTrack
                    mouseTrackLeft={10}
                />
                <DataTable value={materielsData}
                    selectionMode="single"
                    selection={selected}
                    onSelectionChange={e => setSelected(e.value)}
                    dataKey="_id"
                    header={header}
                    emptyMessage="Aucun materiel."
                >
                    <Column field="_id" hidden />
                    <Column field="marque" header="Marque" filter filterPlaceholder="Recherche par Marque" sortable /*style={{ minWidth: '12rem' }}*/ />
                    <Column field="modele" header="Modele" filter filterPlaceholder="Recherche par Modele" sortable /*style={{ minWidth: '12rem' }}*/ />
                    <Column field="annee" header="Annee" filter filterPlaceholder="Recherche par Annee" sortable /*style={{ minWidth: '12rem' }}*/ />
                    {/* <Column header="Country" filterField="country.name" sortable style={{ justifyContent: 'space-between' }} body={countryBodyTemplate} filter filterPlaceholder="Recherche par pays" />
                    <Column header="Agent" filterField="representative" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}
                        filter filterElement={representativeRowFilterTemplate} />
                    <Column field="status" header="Status" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    <Column field="verified" header="Verified" sortable dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />*/}
                    <Column header="Action" headerStyle={{ minWidth: "3vw", textAlign: 'center' }} bodyStyle={{ minWidth: "3vw", textAlign: 'center', overflow: 'visible', justifyContent: 'flex-end' }} body={actionBodyTemplate} />
                </DataTable>
            </div>

        </div>

    )
}