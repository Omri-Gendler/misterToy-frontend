import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service";
import { AppHeader } from "./AppHeader";
import { ToyList } from "./ToyList";



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

        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update car')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveCar(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update car')
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