import { useState, useCallback } from "react"

export const Dropdown = ()=>{
    const [value,setValue] = useState("M")
    const handleChange = useCallback((e)=>{
        setValue(e.target.value)
    },[])
    return(
        <div className="p-1 shadow-2xl border-1">
            <select value = {value} onChange = {handleChange}>
            <option value = "l">L</option>
            <option value = "M">M</option>
            <option value = "S">S</option>
            </select>
        </div>
    )
}