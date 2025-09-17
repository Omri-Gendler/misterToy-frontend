import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { ToyList } from "../cmps/ToyList.jsx";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useNavigate } from "react-router"
import { loadToys, removeToyOptimistic, updateToy, setFilter } from "../stores/toy.actions.js";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import '../assets/style/cmps/ToyIndex.css'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const maxPage = useSelector(storeState => storeState.toyModule.maxPage)

    useEffect(() => {
        fetchToys()
    }, [filterBy])

    async function fetchToys() {
        try {
            await loadToys()
        } catch (error) {
            showErrorMsg('Cannot load toys')
        }
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            loadToys()
            showSuccessMsg('Toy removed')
        } catch (error) {
            console.log('Cannot remove toy', error)
            showErrorMsg('Cannot remove toy')
        }
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0

        onSetFilter({ ...filterBy, pageIdx: newPageIdx })
    }

    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {user && user.isAdmin && (
                <button style={{ alignSelf: 'center' }}>
                    <Link to="/toy/edit">Add Toy</Link>
                </button>
            )}
            <ToyList toys={toys} onRemoveToy={onRemoveToy} loggedInUser={user} />
            {
                <div className="pagination">
                    <button
                        onClick={() => onChangePageIdx(-1)}
                        disabled={filterBy.pageIdx === 0}>
                        Previous
                    </button>

                    <span>Page {filterBy.pageIdx + 1} of {maxPage || 1}</span>

                    <button
                        onClick={() => onChangePageIdx(1)}
                        disabled={filterBy.pageIdx + 1 >= maxPage}>
                        Next
                    </button>
                </div>
            }
        </section>
    )
}
