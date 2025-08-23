import { useState, useEffect } from "react"
import { storageService } from '../services/async-storage.service.js'
import { useParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"
// import { loadToys } from "../stores/toy.actions.js"
import '../assets/style/cmps/TodoDetails.css' // Import the CSS

export function ToyDetails() {
    const [toy, setToy] = useState(null)

    useEffect(() => {
        loadToys()
    }, [])


    function loadToys() {
        storageService.query('toyDB')
            .then(toys => {
                console.log('Loaded toys:', toys)
                setToy(toys[0])
                console.log('Loaded toy:', toys[0])
            })
    }

    return (
        <div className="toy-details">
            <AppHeader />
            <div className="toy-details__content">
                Toy Details for toy ID: {toy?._id}
            </div>
        </div>
    )
}