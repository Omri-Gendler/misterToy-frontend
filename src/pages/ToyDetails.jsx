import { useState, useEffect } from "react"
import { storageService } from '../services/async-storage.service.js'
import { useParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"
import '../assets/style/cmps/TodoDetails.css' // Import the CSS

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) {
            loadToys()
        }
    }, [toyId])

    function loadToys() {
        storageService.get(toyId)
            .then((toy) => {
                setToy(toy)
            })
            .catch(err => {
                console.error('Error loading toy:', err)
            })
    }
    if (!toy) {
        return (
            <div className="toy-details">
                <AppHeader />
                <div className="toy-details__loading">Loading...</div>
            </div>
        )
    }
    return (
        <div className="toy-details">
            <AppHeader />
            <div className="toy-details__content">
                Toy Details for toy ID: {toy._id}
            </div>
        </div>
    )
}