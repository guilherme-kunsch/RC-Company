import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'
import { initFlowbite } from 'flowbite'

export function App() {
    initFlowbite();
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}