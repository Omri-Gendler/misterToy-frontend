import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


export function ToyFilter({ onSetFilter, labels }) {
    const [filterBy, setFilterBy] = useState({ name: '', importance: 0, labels: '' })

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            onSetFilter(filterBy)
        }, 400) 

        return () => clearTimeout(timer)
    }, [filterBy.name, filterBy.labels]) 

    function handleChange(ev) {
        const { name, value } = ev.target
        const newFilter = { ...filterBy, [name]: value }
        setFilterBy(newFilter)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={filterBy.name} onChange={handleChange} placeholder="Search..." />
                <select name="inStock" value={filterBy.inStock} onChange={handleChange}>
                    <option value="0">On Stock</option>
                    <option value="1">Off Stock</option>
                    <option value="2">All</option>
                </select>

                <Select style={{ maxWidth: 100, maxHeight: 40, marginRight: 10, marginLeft: 10, backgroundColor: 'rgb(59, 59, 59)' }}
                    name="labels"
                    value={filterBy.labels}
                    onChange={handleChange}
                >
                    {labels.map(label => (
                        <MenuItem key={label} value={label}>{label}</MenuItem>
                    ))}
                </Select>



                {/* <select name="labels" value={filterBy.labels} onChange={handleChange}>
                    <option value="">Select Label</option>
                    {labels.map(label => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                </select> */}
                <button>Apply Filter</button>
                <button onClick={() => setFilterBy({ name: '', importance: 0, labels: '' })}>Clear</button>
            </form>
        </div>
    )
}