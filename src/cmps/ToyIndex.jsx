import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service";
import { AppHeader } from "./AppHeader";



export function ToyIndex() {

    const [toys, setToys] = useState([])

    useEffect(() => {
        toyService.query()
            .then(toys => {
                setToys(toys)
                console.log('Loaded toys:', toys)
            })
    }, [])

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
        </div>
    )
}