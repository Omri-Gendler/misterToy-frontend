import { NavLink } from "react-router-dom"
import '../assets/style/cmps/AppHeader.css'
import { UserMsg } from "./UserMsg"


export function AppHeader() {
    return (
        <section className="header-container">
            <header className="header-container__main">
                <h1 className="header-container__title">Mister Toy</h1>
            </header>
            <nav className="header-container__nav">
                <NavLink to="/" className="header-container__link">Home</NavLink>
                <NavLink to="/toy" className="header-container__link">Toys</NavLink>
                <NavLink to="/dashboard" className="header-container__link">Dashboard</NavLink>
                {/* <NavLink to="/shops" className="header-container__link">Shops</NavLink> */}
            </nav>
            <UserMsg />
        </section>
    )
}
