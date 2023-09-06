import React from 'react'
import { ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneField = ({form, label_text, field, placeholder}) => {
    return (
        <div>
            <label className='text-sm'>
                {label_text}
            </label>
            <PhoneInput
                enableAreaCodes={true}
                copyNumbersOnly={false}
                prefix={"+"}
                autoFormat={false}
                value={form.values[field]}
                placeholder={placeholder}
                onChange={
                    (phone, country) => {
                        form.setFieldValue('value', phone)
                        if(country.countryCode){
                            form.setFieldValue("phonecode", country.dialCode)
                            form.setFieldValue("countrycode", country.countryCode)
                        }
                    }
                }
                className={form.values[field] ? "phone-drop-d" : form.errors[field] ? "phone-drop-error" : ""}
            />

            <p className="text-xs text-red-500">
                {/* <ErrorMessage name={`${field}`} /> */}
                {form.errors[field]}
            </p>
        </div>
  )
}

export default PhoneField