import React, { useState, useEffect } from "react";
import FieldGroup from "./FieldGroup";
import Field from "./Field";
import Option from "./Option";


export const FormBuilder = ({ formData, getValues }) => {
    const [page, setPage] = useState(0);
    const [currentPageData, setCurrentPageData] = useState(formData[page]);
    const [values, setValues] = useState({});

    // this effect will run when the `page` changes
    useEffect(() => {
        const upcomingPageData = formData[page];
        setCurrentPageData(upcomingPageData);
        setValues(currentValues => {
            const newValues = upcomingPageData.fields.reduce((obj, field) => {
                if (field.component === "field_group") {
                    for (const subField of field.fields) {
                        obj[subField._uid] = "";
                    }
                } else {
                    obj[field._uid] = "";
                }

                return obj;
            }, {});

            return Object.assign({}, newValues, currentValues);
        });
    }, [page, formData]);

    useEffect(() => {
        console.log(values)
        getValues(values)
    }, [values])

    const fieldChanged = (fieldId, value) => {
        setValues(currentValues => {
            currentValues[fieldId] = value;
            getValues(currentValues)
            return currentValues;
        });

        setCurrentPageData(currentPageData => {
            return Object.assign({}, currentPageData);
        });
    };
    const onSubmit = e => {
        e.preventDefault();
        // todo - send data somewhere
    };


    return (
        <>
            {currentPageData.fields.map(field => {
                switch (field.component) {
                    case "field_group":
                        return (
                            <FieldGroup
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                values={values}
                            />
                        );
                    case "options":
                        return (
                            <Option
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                value={values[field._uid]}
                            />
                        );
                    default:
                        return (
                            <Field
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                value={values[field._uid]}
                            />
                        );
                }
            })}
        </>
    )
}