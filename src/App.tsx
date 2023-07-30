import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'

import Root from './Root'
import Campaigns from './Campaigns'
import CampaignHome from './CampaignHome'
import WorldMap from './WorldMap'

import './App.css'

const ErrorElement = () => (
    <div>
        Uh oh!
        <br />
        <Link to="/">home</Link>
    </div>
)

async function campaignLoader({ params }: { params: { campaignId?: string } }) {
    return {
        campaign: {
            id: params.campaignId,
            name: 'my first campaign',
        },
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: 'campaigns',
                element: <Campaigns />,
                loader: async function campaignsLoader() {
                    return [{ name: 'my first campaign', id: 1 }]
                },
            },
            {
                path: 'campaigns/:campaignId/',
                id: 'campaignHome',
                loader: campaignLoader,
                element: <CampaignHome />,
                children: [
                    {
                        path: 'maps/worldmap',
                        element: <WorldMap />,
                    },
                ],
            },
        ],
    },
])

function App() {
    return (
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    )
}

export default App
