import { useState, useEffect } from "react"
import { AppHeader } from "../cmps/AppHeader.jsx"
import '../assets/style/cmps/TodoDetails.css' // Import the CSS
import { toyService } from "../services/toy.service.js"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadToys, removeToy, updateToy, setFilter } from "../stores/toy.actions.js";
import { useNavigate } from "react-router"
const TOY_KEY = 'toyDB'

export function ToyDetails() {
    const toys = useSelector(state => state.toyModule.toys)
    const navigate = useNavigate()
    const [toy, setToy] = useState(null)

    console.log('toys', toys)
    const currToy = toys.find(toy => toy._id === useParams().id) || {}
    console.log('currToy', currToy)

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

    function onRemoveToy(toyId) {
        console.log('Removing toy:', toyId)
        removeToy(toyId)
        navigate('/toy')
    }

    function onEditToy(toy) {
        updateToy(toy)
        navigate(`/toy/edit/${toy._id}`)
    }


    return (
        <div className="toy-details">
            <AppHeader />
            <div className="toy-details__content">
                <img className="toy-card img" src={currToy.imgUrl} alt="" />
                <p>{currToy.name}</p>
                <p>{currToy.price}</p>
            </div>
            <button onClick={() => onEditToy(currToy)}>Edit</button>
            <button onClick={() => onRemoveToy(currToy._id)}>Delete</button>
        </div>
    )
}