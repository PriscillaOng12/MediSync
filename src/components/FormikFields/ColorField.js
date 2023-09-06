import React from 'react'
import { ChromePicker } from "react-color";
import { ErrorMessage } from 'formik';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useState } from 'react';

const ColorField = ({ form, field, label_text }) => {
    const [showColor, setShowColor] = useState(false)
    const ref = useDetectClickOutside({ onTriggered: () => setShowColor(false) });

    return (
        <div ref={ref} className='flex items-center space-x-5'>
            <div className='relative'>
                <p className="text-xs font-bold">
                    {
                        label_text
                    }
                </p>
                <input type="text" value={form.values[field]} className="input-text" onFocus={() => setShowColor(true)} />
                {
                    showColor &&
                    <div className="absolute z-[15] top-8">
                        <ChromePicker
                            color={form.values[field]}
                            onChange={value => {
                                form.setFieldValue(field, value.hex)
                            }
                            }
                            handleChangeComplete={
                                value => {
                                    form.setFieldValue(field, value.hex)
                                }
                            }
                            disableAlpha

                        />
                        <div onClick={() => setShowColor(false)} className="bg-green-primary text-white font-bold cursor-pointer w-full py-2 text-center px-4">
                            Close
                        </div>
                    </div>
                }
                <p className="text-red-500 text-xs mt-3">
                    <ErrorMessage name={field} />
                </p>
            </div>
            <div className="h-12 w-12 rounded-full border-2" style={{
                backgroundColor: form.values[field]
            }}>

            </div>
        </div>
    )
}

export default ColorField