import { AppHeader } from '../cmps/AppHeader'
import '../assets/style/cmps/Home.css' 


export function Home() {
    return (
        <div className="home">
            <AppHeader />
            <h1 className="home-title">Welcome to the Toy Store</h1>
            <img className="home-logo"
                src="/home-logo.png"
                alt="Toy Store"
                width={400}
                height={500}
            />
            <p className="home-description">
                Discover a world of fun and educational toys for children of all ages.
            </p>
        </div>
    )
}