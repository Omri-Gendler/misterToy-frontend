import { Link } from "react-router-dom"


export function AppHeader() {
    return (
        <section>

            <header>
                <h1>Mister Toy</h1>
            </header>

            <Link to="/">Home</Link>
            <Link to="/toy/:toyId">Toy Details</Link>
        </section>

    )
}
