import { Link, NavLink, useNavigate } from "react-router-dom"
import { authService } from '../services/auth.service'
import '../assets/style/cmps/AppHeader.css'
import { UserMsg } from "./UserMsg"

const logo = '/logo2.svg'

export function AppHeader({ loggedInUser, setLoggedInUser }) {
    const navigate = useNavigate()

    async function onLogout() {
        await authService.logout()
        setLoggedInUser(null)
        navigate('/')
    }

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
            <div style={{ float: 'right' }}>
                {loggedInUser ? (
                    <button onClick={onLogout}>Logout ({loggedInUser.username})</button>
                ) : (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button>Signup</button>
                        </Link>
                    </>
                )}
            </div>
            <UserMsg />
        </section>
    )
}
