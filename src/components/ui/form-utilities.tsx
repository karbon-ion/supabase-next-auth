"use client"

import { ErrorMessage, Field } from "formik";


interface FieldModel {
    name: string
    label?: string
    type?: string
    className?: string
    labelClassName?: string
}

export const LabeledField = ({name, label, type = 'text', className, labelClassName}: FieldModel)=>(
    <>
    <label className={`block text-sm font-medium text-gray-600 ${labelClassName || ''}`}>{label}</label>
    <Field name={name} type={type}>
        {({field}: any)=>(
            <input
            type={type}
            className={`mt-1 p-2 w-full border text-black rounded-md ${className || ''}`} 
            {...field}
            />
        )}
    </Field>
    <ErrorMessage name={name}>
        {msg => <div className="text-red-700">{msg}</div>}
    </ErrorMessage>
    </>
)