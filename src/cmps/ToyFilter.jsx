import { useState } from 'react'


export function ToyFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', importance: 0 })

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterBy(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={filterBy.name} onChange={handleChange} placeholder="Search..." />
            <select name="inStock" value={filterBy.inStock} onChange={handleChange}>
                <option value="0">true</option>
                <option value="1">false</option>
                <option value="2">all</option>
            </select>
            <button>Apply Filter</button>
        </form>
    )
}