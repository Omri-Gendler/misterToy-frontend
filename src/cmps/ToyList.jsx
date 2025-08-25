


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul>
            {toys.map(toy => (
                <li key={toy.id}>
                    {toy.name}
                    <button onClick={() => onEditToy(toy)}>Edit</button>
                    <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                </li>
            ))}
        </ul>
    );
}
