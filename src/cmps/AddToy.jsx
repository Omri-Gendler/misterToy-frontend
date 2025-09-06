import { AppHeader } from "./AppHeader";
import { useNavigate } from "react-router-dom";

import '../assets/style/cmps/AddToy.css'
import { addToy, loadToys } from "../stores/toy.actions";



export function AddToy() {
    const navigate = useNavigate()
    const img = '/toy.jpg.jpg' 


    async function handleSubmit(ev) {
        ev.preventDefault()
        const name = ev.target.name.value
        const price = ev.target.price.value
        const imgUrl = '/toy.jpg.jpg'
        
        await addToy({ name, price, imgUrl })
        await loadToys()
        navigate('/toy')
    }

    return (
        <div className="add-toy-page">
            <AppHeader />
            <form onSubmit={handleSubmit} className="add-toy-form">
                <input type="text" name="name" placeholder="Toy Name" />
                <input type="number" name="price" placeholder="Price" />
                <select name="type" id="">
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                </select>
                <button type="submit">Add Toy</button>
            </form>
        </div>
    )
}