


export function ToyEdit() {
    return (
        <div className="toy-edit">
            <h2>Edit Toy</h2>
            <form>
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