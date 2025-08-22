import { NavLink } from "react-router-dom"
import '../assets/style/cmps/AppHeader.css'

export function AppHeader() {
    return (
        <section className="header-container">
            <header className="header-container__main">
                <h1 className="header-container__title">Mister Toy</h1>
            </header>
            <nav className="header-container__nav">
                <NavLink to="/" className="header-container__link">Home</NavLink>
                <NavLink to="/toy" className="header-container__link">Toys</NavLink>
            </nav>
        </section>
    )
}
