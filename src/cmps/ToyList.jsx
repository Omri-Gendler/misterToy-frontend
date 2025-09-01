import { useNavigate } from "react-router";

import '../assets/style/cmps/ToyList.css'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const navigate = useNavigate()

    const currPage = 1
    const toysPerPage = 5
    const start = (currPage - 1) * toysPerPage
    const end = start + toysPerPage
    const currToys = toys.slice(start, end)

    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <div key={toy._id}>
                    <li className="toy-card">
                        <h3 className="toy-card header">{toy.name}</h3>
                        <img className="toy-img" onClick={() => navigate(`/toy/${toy._id}`)} src={toy.imgUrl} alt={toy.name} />
                        <div className="toy-card-body">
                            <div className="toy-info">
                                <div>price: {toy.price}</div>
                                <div>type: {toy.type}</div>
                            </div>
                            <div className="toy-card-actions">
                                <button className="toy-card button"
                                    onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                                <button className="toy-card button" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            </div>
                        </div>
                    </li>
                </div>
            ))}
        </ul>
    );
}
