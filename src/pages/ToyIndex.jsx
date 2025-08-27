import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { ToyList } from "../cmps/ToyList.jsx";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useNavigate } from "react-router"
import { loadToys, removeToy, updateToy, setFilter } from "../stores/toy.actions.js";

// import '../assets/css/pages/ToyIndex.css'


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
            <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
        </div>
    )
}