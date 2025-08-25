import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { saveToy, updateToy } from "../stores/toy.actions.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const toyId = useParams().id
    console.log('Editing toy with ID:', toyId)

    async function handleSubmit(ev) {
        ev.preventDefault()
        const name = ev.target.name.value
        const price = ev.target.price.value
        const type = ev.target.type.value

        await updateToy({ _id: toyId, name, price, type })
        console.log('Form submitted with:', { id: toyId, name, price, type })
        await navigate(`/toy`)
    }
    return (
        <div className="toy-edit">
            <h2>Edit Toy</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" />
                </label>
                <label>
                    Type:
                    <select name="type" id="">
                        <option value="inStock">true</option>
                        <option value="inStock">false</option>
                    </select>
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}