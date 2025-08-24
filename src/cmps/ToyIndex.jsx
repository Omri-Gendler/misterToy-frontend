import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { AppHeader } from "./AppHeader";
import { ToyList } from "./ToyList";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "./ToyFilter.jsx";
import { useNavigate } from "react-router"
import { toyActions } from "../stores/toy.actions.js";

import '../assets/css/pages/ToyIndex.css'


export function ToyIndex() {

    // const [toys, setToys] = useState([])
    const toys = useSelector(state => state.toyModule.toys)
    const [filterBy, setFilterBy] = useState({ name: '', inStock: 0 })
    const navigate = useNavigate()


    useEffect(() => {
        toyService.query()
        toyActions.loadToys()
        console.log('Loaded toys:', toys)
    }, [])

    function onRemoveToy(toyId) {
        toyService.remove(toyId)
            .then(() => {
                toyActions.removeToy(toyId)
                console.log('Removed toy:', toyId)
            })
    }

    function onEditToy(toy) {
        navigate(`/toy/edit/${toy._id}`)
        // const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        toyService.save(toyToSave)
            .then((savedToy) => {
                setToys(toys.map(toy => toy._id === savedToy._id ? savedToy : toy))
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        toyService.query(filterBy)
            .then(toys => {
                setToys(toys)
                console.log('Filtered toys:', toys)
            })
    }

    return (
        <div className="toy-index">
            <AppHeader />
            <ToyFilter onSetFilter={onSetFilter} />
            {toys && toys.map(toy => (
                <div key={toy._id} className="toy-preview">
                    <h3>{toy.name}</h3>
                    <p>Price: {toy.price}</p>
                    <p>Type: {toy.type}</p>

                </div>
            ))}
            <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
        </div>
    )
}