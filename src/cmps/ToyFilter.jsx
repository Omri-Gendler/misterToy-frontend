import { useState } from 'react'
import { useNavigate } from 'react-router'


export function ToyFilter({ onSetFilter, labels }) {
    const [filterBy, setFilterBy] = useState({ name: '', importance: 0 })

    const navigate = useNavigate()



    function handleChange(ev) {
        const { name, value } = ev.target
        const newFilter = { ...filterBy, [name]: value }
        setFilterBy(newFilter)
        if (name === 'labels') {
            onSetFilter(newFilter)
        }
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

                <select name="labels" value={filterBy.labels} onChange={handleChange}>
                    <option value="">Select Label</option>
                    {labels.map(label => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                </select>
                <button>Apply Filter</button>
            </form>
        </div>
    )
}