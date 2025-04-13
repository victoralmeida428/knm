// components/FormField.tsx
import {InputHTMLAttributes, forwardRef} from 'react'
import {FormikProps, FormikValues} from "formik";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
    description?: string
    icon?: React.ReactNode
    formik?: FormikProps<FormikValues>
    containerClassName?: string

}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    (
        {
            label,
            description,
            icon,
            formik,
            className = '',
            containerClassName = '',
            ...props
        },
        ref
    ) => {
        const hasError =  formik?.errors[props.name ?? ""]
        const baseClasses = `block w-full rounded-md border ${
            hasError
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        } shadow-sm`

        const inputClasses = `${baseClasses} ${
            icon ? 'pl-10' : 'pl-3'
        } pr-3 py-2 ${className} ${props.disabled?'bg-gray-300 select-none text-gray-600':''}`

        return (
            <div className={`mb-4 ${containerClassName}`}>
                {label && (
                    <label
                        htmlFor={props.id}
                        className={`block text-sm font-medium ${
                            hasError ? 'text-red-700' : 'text-gray-700'
                        } mb-1`}
                    >
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative rounded-md shadow-sm">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={inputClasses}
                        onChange={props.onChange??formik?.handleChange}
                        onBlur={props.onBlur??formik?.handleBlur}
                        value={formik?.values[props.name ?? ""]}
                        {...props}
                    />
                </div>

                {description && !hasError && (
                    <p
                        id={`${props.id}-description`}
                        className="mt-1 text-sm text-gray-500"
                    >
                        {description}
                    </p>
                )}

                {hasError && (
                    <p
                        id={`${props.id}-error`}
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                    >
                        {formik?.errors[props.name ?? ""]?.toString()}
                    </p>
                )}
            </div>
        )
    }
)

FormField.displayName = 'FormField'

export default FormField