import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useNavigate } from "react-router"
import { loadToys, removeToy, updateToy, setFilter } from "../stores/toy.actions.js";

import '../assets/css/pages/ToyIndex.css'


export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const [filterBy, setFilterBy] = useState({ name: '', inStock: 0 })
    const navigate = useNavigate()


    useEffect(() => {
        loadToys(filterBy)
        console.log('Loaded toys:', toys)
    }, [filterBy])

    function onRemoveToy(toyId) {
        console.log('Removing toy:', toyId)
        removeToy(toyId)
    }

    function onEditToy(toy) {
        updateToy(toy)
        navigate(`/toy/edit/${toy._id}`)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <div className="toy-index">
            <AppHeader />
            <ToyFilter onSetFilter={onSetFilter} />
            {toys && toys.map(toy => (
                <div key={toy._id} className="toy-card">
                    <h3 className="toy-card h3">{toy.name}</h3>
                    <img className="toy-card img" src={toy.imgUrl} alt={toy.name} />
                    <p>Price: {toy.price}</p>
                    <p>Type: {toy.type}</p>
                    <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
                    <button className="toy-card button" onClick={() => onEditToy(toy)}>Edit</button>
                    <button className="toy-card button" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                </div>
            ))}
            {/* <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} /> */}
        </div>
    )
}