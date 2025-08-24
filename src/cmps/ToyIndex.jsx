import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service";
import { AppHeader } from "./AppHeader";
import { ToyList } from "./ToyList";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { toyActions } from "../stores/toy.actions.js";



export function ToyIndex() {

    const [toys, setToys] = useState([])

    useEffect(() => {
        toyService.query()
            .then(toys => {
                setToys(toys)
                console.log('Loaded toys:', toys)
            })
    }, [])

    function onRemoveToy(toyId) {
        toyService.remove(toyId)
            .then(() => {
                setToys(toys.filter(toy => toy._id !== toyId))
                console.log('Removed toy:', toyId)
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
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

    return (
        <div className="toy-index">
            <AppHeader />
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