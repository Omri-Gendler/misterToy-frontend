import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { saveToy, updateToy } from "../stores/toy.actions.js"
import { Chat } from "../cmps/Chat.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { PopUp } from "../cmps/PopUp.jsx"
import { useEffect, useState } from "react"
import { getToyById } from "../stores/toy.actions.js" // or your toyService


export function ToyEdit() {
    const navigate = useNavigate()
    const toyId = useParams().id
    const [toy, setToy] = useState(null)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    useEffect(() => {
        async function loadToy() {
            const loadedToy = await getToyById(toyId) // or toyService.get(toyId)
            setToy(loadedToy)
        }
        loadToy()
    }, [toyId])

    async function handleSubmit(ev) {
        ev.preventDefault()
        const name = ev.target.name.value
        const price = ev.target.price.value
        const type = ev.target.type.value

        await updateToy({ _id: toyId, name, price, type })
        console.log('Form submitted with:', { id: toyId, name, price, type })
        await navigate(`/toy`)
    }

    if (!toy) return <div>Loading...</div>

    // Only allow editing if the logged-in user is the owner
    if (!loggedInUser || toy.owner !== loggedInUser._id) {
        return <div>You are not authorized to edit this toy.</div>
    }

    return (
        <div className="toy-edit">
            <AppHeader />
            <h2>Edit Toy</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={toy.name} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" defaultValue={toy.price} />
                </label>
                <label>
                    Type:
                    <select name="type" defaultValue={toy.type}>
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </label>
                <button type="submit">Save</button>
            </form>
            {/* Floating chat button */}
            <button
                className="floating-chat-btn"
                onClick={() => setIsPopUpOpen(true)}
                title="Open Chat"
            >
                💬
            </button>
            <PopUp
                isOpen={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
            >
                <Chat />
            </PopUp>
            <button onClick={() => navigate('/toy')}>Back</button>
        </div>
    )
}