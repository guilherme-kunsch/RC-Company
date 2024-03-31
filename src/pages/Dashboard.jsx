import React from 'react';
import { Layout } from '../components/Layout';

export function Dashboard() {
    return (
        <div>
            <Layout />
            <div className='dark:text-white'>Dashboard</div>
            <p className='bg-white'>Ola mundo</p>
        </div>
    )
}

