import { AppHeader } from "./AppHeader";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { useState } from "react";
import '../assets/style/cmps/AddToy.css'
import { addToy, loadToys } from "../stores/toy.actions";
import { useSelector } from 'react-redux'

const schema = yup.object({
    name: yup.string().required('Name is required'),
    price: yup.number().positive('Price must be positive').required('Price is required'),
    type: yup.string().required('Type is required'),
});

export function AddToy({ loggedInUser }) {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    async function handleSubmit(ev) {
        ev.preventDefault()
        const formData = {
            name: ev.target.name.value,
            price: ev.target.price.value,
            type: ev.target.type.value,
            imgUrl: '/toy.jpg.jpg'
        }

        try {
            await schema.validate(formData)
            await onAddToy(formData)
            await loadToys()
            navigate('/toy')
        } catch (err) {
            setError(err.message)
        }
    }

    async function onAddToy(toyData) {
        const toyToSave = {
            ...toyData,
            owner: loggedInUser._id,
        }
        await addToy(toyToSave)
    }

    if (!loggedInUser) return <div>Please log in to add a toy.</div>

    return (
        <div className="add-toy-page">
            {/* <AppHeader /> */}
            <form onSubmit={handleSubmit} className="add-toy-form">
                {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                <input type="text" name="name" placeholder="Toy Name" />
                <input type="number" name="price" placeholder="Price" />
                <select name="type">
                    <option value="">Select Type</option>
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                </select>
                <button type="submit">Add Toy</button>
            </form>
        </div>
    )
}