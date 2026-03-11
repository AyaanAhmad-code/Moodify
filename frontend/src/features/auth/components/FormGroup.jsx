import React from 'react'

const FormGroup = ({value,onChange,placeholder,label}) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input value={value} onChange={onChange} type="text" name={label} id={label} placeholder={placeholder} required />
    </div>
  )
}

export default FormGroup
