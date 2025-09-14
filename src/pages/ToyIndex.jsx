import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { ToyList } from "../cmps/ToyList.jsx";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useNavigate } from "react-router"
import { loadToys, removeToy, updateToy, setFilter } from "../stores/toy.actions.js";
import { NavLink } from "react-router-dom";

import '../assets/style/cmps/ToyIndex.css'

export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const [filterBy, setFilterBy] = useState({ name: '', inStock: 0 })
    const navigate = useNavigate()

    const labels = toyService.getLabels()
    console.log('Labels:', labels)

    const totalToys = toys.length
    const toysPerPage = 5
    const totalPages = Math.ceil(totalToys / toysPerPage)
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
    }

    function onEditToy(toy) {
        updateToy(toy)
        navigate(`/toy/edit/${toy._id}`)
    }

    function onSetFilter(filterBy) {
        setCurrPage(1)
        setFilterBy(filterBy)
    }

    const startIdx = (currPage - 1) * toysPerPage
    const endIdx = startIdx + toysPerPage
    const toysToShow = toys.slice(startIdx, endIdx)

    return (
        <div className="toy-index">
            {/* <AppHeader /> */}
            <ToyFilter onSetFilter={onSetFilter} labels={labels} />
            <div className="pagination">
                <button
                    disabled={currPage === 1}
                    onClick={() => setCurrPage(currPage - 1)}
                >
                    Prev
                </button>
                <span>Page {currPage} of {totalPages}</span>
                <button
                    disabled={currPage === totalPages}
                    onClick={() => setCurrPage(currPage + 1)}
                >
                    Next
                </button>
                
                <NavLink className="add-toy" to="/add">Add Toy</NavLink>

            </div>
            <ToyList toys={toysToShow} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />

        </div>
    )
}