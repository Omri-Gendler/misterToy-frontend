import { useState } from 'react'
import { useNavigate } from 'react-router'


export function ToyFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', importance: 0 })

    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterBy(prevFilter => ({ ...prevFilter, [name]: value }))
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
                <button>Apply Filter</button>
            </form>
        </div>
    )
}