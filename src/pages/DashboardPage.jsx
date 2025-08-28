import { useSelector } from "react-redux"
import { Dashboard } from '../cmps/Dashboard.jsx'



export function DashboardPage() {
    const toys = useSelector(state => state.toyModule.toys)
    return (
        <section>
            <h2>Dashboard</h2>
            <Dashboard toys={toys} />
        </section>
    )
}