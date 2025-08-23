import { useState, useEffect } from "react"
import { storageService } from '../services/async-storage.service.js'
import { useParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"
// import { loadToys } from "../stores/toy.actions.js"
import '../assets/style/cmps/TodoDetails.css' // Import the CSS
import { toyService } from "../services/toy.service.js"

const TOY_KEY = 'toyDB'

export function ToyDetails() {
    const [toy, setToy] = useState(null)

    useEffect(() => {
        loadToys()
    }, [])


    function loadToys() {
        toyService.query(TOY_KEY)
            .then(toys => {
                setToy(toys)
                console.log('Loaded toys:', toys)
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