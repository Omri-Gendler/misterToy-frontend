import express from 'express'
import cookieParser from 'cookie-parser'

import { loggerService } from './services/loggerService.js'


const app = express()

app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://localhost:5173'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { toyRoutes } from './api/toy/toy.routes.js'
import { userRoutes } from './api/user/user.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/toy', toyRoutes)
app.use('/api/user', userRoutes)

// fallback route
app.get('/**', (req, res) => {
    res.sendFile('index.html', { root: 'public' })
})

const port = process.env.PORT || 3030
app.listen(port, () => {
    loggerService.info('Server is running on port: ' + port)
})