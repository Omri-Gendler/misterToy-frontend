import { useSelector } from "react-redux"
import { Dashboard } from '../cmps/Dashboard.jsx'
import { AppHeader } from "../cmps/AppHeader.jsx"



export function DashboardPage() {
    const toys = useSelector(state => state.toyModule.toys)
    return (
        <section>
            <h2>Dashboard</h2>
            <AppHeader />
            <Dashboard toys={toys} />
        </section>
    )
}