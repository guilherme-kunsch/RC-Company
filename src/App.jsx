import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes'
export function App() {
    return (
        <RouterProvider router={routes} />
    )
}