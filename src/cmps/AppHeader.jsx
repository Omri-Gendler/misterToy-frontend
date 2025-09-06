import { NavLink } from "react-router-dom"
import '../assets/style/cmps/AppHeader.css'
import { UserMsg } from "./UserMsg"

const logo = '/logo2.svg'

export function AppHeader() {
    return (
        <section className="header-container">
            <header>
                <h1><img src={logo} alt="Mister Toy Logo" width={100} height={100} /></h1>
            </header>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/shops">Shops</NavLink>
            </nav>
            <UserMsg />
        </section>
    )
}
