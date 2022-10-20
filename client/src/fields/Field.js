import React from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
const Field = ({ field, fieldChanged, type, value }) => {
    if (type || field.component === 'text') {
        return (
            <div className="field" key={field._uid}>
                <label htmlFor={field._uid} className="blocks">{field.label}</label>
                { }
                <InputText
                    //type={type || field.component}
                    id={field._uid}
                    name={field._uid}
                    value={value}
                    onChange={e => fieldChanged(field._uid, e.target.value)} aria-describedby={`${field._uid}-help`} className="blocks" />
                    {field.helper_text ?
                    <small id={`${field._uid}-help`} className="blocks">{field.helper_text}</small>
                    : null
                }
            </div>
        );
    }
    if (type || field.component === 'number') {
        return (
            <div className="field" key={field._uid}>
                <label htmlFor={field._uid} className="blocks">{field.label}</label>
                { }
                <InputNumber
                    id={field._uid}
                    name={field._uid}
                    value={value}
                    mode={field.mode}
                    onChange={e => fieldChanged(field._uid, e.target.value)} aria-describedby={`${field._uid}-help`} className="blocksdd" />
                {field.helper_text ?
                    <small id={`${field._uid}-help`} className="blocks">{field.helper_text}</small>
                    : null
                }

            </div>
        );
    }
    return null;
};

export default Field;