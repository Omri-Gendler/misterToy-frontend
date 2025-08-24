import { useNavigate } from "react-router"


export function ToyEdit() {
    const navigate = useNavigate()

    function handleSubmit(ev) {
        ev.preventDefault()
        navigate(`/toy`)
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
                    <input type="text" name="type" />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}