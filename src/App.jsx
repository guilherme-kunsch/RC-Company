import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'
import { Background } from './components/Background'

export function App() {
    return (
        <div>
            <Background />
            <RouterProvider router={router} />
        </div>
    )
}