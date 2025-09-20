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

const DEFAULT_IMG = '/toy.jpg.jpg'

export function AddToy({ loggedInUser }) {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    async function handleSubmit(ev) {
        ev.preventDefault()
        const formData = {
            name: ev.target.name.value.trim(),
            price: Number(ev.target.price.value),
            type: ev.target.type.value,
            imgUrl: ev.target.imgUrl.value.trim() || DEFAULT_IMG
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
            owner: loggedInUser ? {
                _id: loggedInUser._id,
                username: loggedInUser.username,
                fullname: loggedInUser.fullname,
            } : undefined,
        }
        console.log('Adding toy:', toyToSave)
        await addToy(toyToSave)
    }


    return (
        <div className="add-toy-page">
            <form onSubmit={handleSubmit} className="add-toy-form">
                {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                <input type="text" name="name" placeholder="Toy Name" />
                <input type="number" name="price" placeholder="Price" />
                <select name="type">
                    <option value="">Select Type</option>
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                </select>
                <input type="text" name="imgUrl" placeholder="Image URL" />
                <button type="submit" >Add Toy</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    )
}