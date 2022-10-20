import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tooltip } from "primereact/tooltip";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { FormBuilder } from "../../fields/FormBuilder";

export const DataTableDynamic = ({ data }) => {
    console.log(data)
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [addEditDialog, setAddEditDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selected, setSelected] = useState(null)

    const toast = useRef(null);
    /*  const columns = [
          {field: 'code', header: 'Code'},
          {field: 'name', header: 'Name'},
          {field: 'category', header: 'Category'},
          {field: 'quantity', header: 'Quantity'}
      ];*/



    useEffect(() => {
        console.log('renew')
        setColumns(data.columns)
        setTableData(data.values);
        //columns = data.interventionsColumns;
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {

    }
    const onInputChange = (e, name) => {
        /*const val = (e.target && e.target.value) || '';
        let _client = { ...client };
        _client[`${name}`] = val;*/

        //setClient(_client);
    }
    const openAddEditDialog = () => {
        // setClient(emptyClient);
        setSubmitted(false);
        setAddEditDialog(true);
    }
    const hideDialog = () => {
        setSubmitted(false);
        setAddEditDialog(false);
    }
    const saveDialog = () => {
        setSubmitted(false);
        setAddEditDialog(false);
    }
    const getValues = (values) => {
        console.log(values)
    }
    const addEditDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Enregistrer" icon="pi pi-check" className="p-button-text" onClick={saveDialog} />
        </React.Fragment>
    );

    const dynamicDialogFields = data.fields && Object.entries(data.fields).map((col, i) => {
        console.log(col)
        return <Column key={col.field} field={col.field} header={col.header} filter filterPlaceholder={`Recherche par ${col.header}`} sortable headerStyle={{ background: 'transparent' }} />;
    });

    /*FIN DIALOG*/

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" /*onClick={() => editClient(rowData)}*/ />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" /*onClick={() => confirmDeleteClient(rowData)}*/ />
            </React.Fragment>
        );
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between p-ai-center filter-field flex-column" >
                <h5>{`Liste ${data.title}`}</h5>
                <div className="flex justify-content-between p-ai-center filter-field lg:flex-row flex-column" >
                    <div>
                        <div className="p-inputgroup" style={{ background: 'transparent' }}>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-search" />
                            </span>
                            <InputText placeholder="Recherche" />
                            <Button type="button" icon="pi pi-filter-slash" label="Effacer" className="p-button-outlined" /*onClick={clearFilter2}*/ />
                        </div>
                    </div>
                    <div>
                        <Button type="button" icon="pi pi-plus-circle" label="Ajouter" className="p-button-outlined" onClick={openAddEditDialog} />
                    </div>
                </div>
            </div>
        )
    }
    const header = renderHeader();
    const dynamicColumns = columns && columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} filter filterPlaceholder={`Recherche par ${col.header}`} sortable headerStyle={{ background: 'transparent' }} />;
    });
    console.log(columns)
    return (
        <div>
            <div className="card">
                {<DataTable value={tableData} responsiveLayout="scroll"
                    selectionMode="single"
                    selection={selected}
                    onSelectionChange={e => setSelected(e.value)}
                    // dataKey="_id"
                    header={header}
                    emptyMessage={data.empty}
                    showGridlines
                >
                    {dynamicColumns}
                    <Column header="Action" headerStyle={{ minWidth: "3vw", textAlign: 'center', background: 'transparent' }} bodyStyle={{ minWidth: "3vw", textAlign: 'center', overflow: 'visible', justifyContent: 'flex-end' }} body={actionBodyTemplate} />
                </DataTable>}
            </div>
            <Dialog visible={addEditDialog} style={{ width: '450px' }} header={`Nouveau ${data.title}`} modal className="p-fluid" footer={addEditDialogFooter} onHide={hideDialog}>
                <FormBuilder formData={data.fields} getValues={getValues} />
            </Dialog>
        </div>
    );
}