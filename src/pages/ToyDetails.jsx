import { useState, useEffect } from "react"
import { storageService } from '../services/async-storage.service.js'
import { useParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"


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
            <div>
                <AppHeader />
                <div>Loading...</div>
            </div>
        )
    }
    return <div>Toy Details for toy ID: {toy.id}</div>
}