import { AppHeader } from '../cmps/AppHeader'


export function Home() {
    return (
        <div>
            <AppHeader />
            <h1>Welcome to the Toy Store</h1>
            <img src="/logo.avif" alt="Toy Store" width={200} height={200} style={{ display: 'block', margin: '0 auto' }} />

        </div>
    )
}