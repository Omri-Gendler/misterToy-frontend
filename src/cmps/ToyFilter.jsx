import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toyService } from '../services/toy.service.js'


export function ToyFilter({ onSetFilter, labels }) {
    const [filterBy, setFilterBy] = useState({ name: '', importance: 0, labels: [], inStock: '' })
    console.log('labels', labels)

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            onSetFilter(filterBy)
        }, 400)

        return () => clearTimeout(timer)
    }, [filterBy])

    function handleChange(ev) {
        const { name, value } = ev.target
        const newFilter = { ...filterBy, [name]: value }
        setFilterBy(newFilter)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    function handleClear() {
        setFilterBy({ name: '', importance: 0, labels: '', inStock: '' })
        onSetFilter({ name: '', importance: 0, labels: '', inStock: '' })
        navigate('/toy')
    }

    return (
        <div className="toy-filter">

            <form className='toy-filter-form' onSubmit={handleSubmit}>
                <label htmlFor="txt">Search:</label>
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="Search toys..."
                    value={filterBy.txt}
                    onChange={handleChange}
                />
                <select className='stock-select' name="inStock" value={filterBy.inStock} onChange={handleChange}>
                    <option value="0">In Stock</option>
                    <option value="1">Out of Stock</option>
                </select>

                <Select className='label-select' style={{ maxWidth: 100, maxHeight: 40, marginRight: 10, marginLeft: 10, backgroundColor: 'rgb(59, 59, 59)' }}
                    name="labels"
                    value={filterBy.labels}
                    onChange={handleChange}
                >
                    <MenuItem value="">Select Label</MenuItem>
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
                <button className='clear-button' onClick={handleClear}>Clear</button>
            </form>
        </div>
    )
}