import { useNavigate } from "react-router";


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const navigate = useNavigate()
    return (
        <ul>
            {toys.map(toy => (
                <div className="toy-card" key={toy._id}>
                    <li className="toy-card" key={toy.id}>
                        <h3 className="toy-card h3">{toy.name}</h3>
                        <img onClick={() => navigate(`/toy/${toy._id}`)} className="toy-card img" src={toy.imgUrl} alt={toy.name} />
                        <p>Price: {toy.price}</p>
                        <p>Type: {toy.type}</p>
                        <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
                        <button className="toy-card button"
                            onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                        <button className="toy-card button" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                    </li>
                </div>
            ))}
        </ul>
    );
}
