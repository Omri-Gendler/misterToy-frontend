import { AppHeader } from '../cmps/AppHeader'
import '../assets/style/cmps/Home.css' // Import the CSS

export function Home() {
    return (
        <div className="home">
            <AppHeader />
            <h1 className="home-title">Welcome to the Toy Store</h1>
            <img
                src="/logo.avif"
                alt="Toy Store"
                width={200}
                height={200}
                className="home-logo"
                style={{ display: 'block', margin: '0 auto' }}
            />
        </div>
    )
}