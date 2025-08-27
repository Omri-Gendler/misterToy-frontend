import { useNavigate } from "react-router";

import '../assets/style/cmps/ToyList.css'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const navigate = useNavigate()
    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <div className="toy-list li" key={toy._id}>
                    <li className="toy-list" key={toy.id}>
                        <h3 className="toy-card h3">{toy.name}</h3>
                        <img className="img" onClick={() => navigate(`/toy/${toy._id}`)} src={toy.imgUrl} alt={toy.name} />
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
