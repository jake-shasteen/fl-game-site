import { useRouteLoaderData, Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

type Loader = {
    campaign?: {
        id: string
        name: string
        description?: string
    }
}
function Root() {
    const loaderData = useRouteLoaderData('campaignHome') as Awaited<Loader>
    const campaign = loaderData?.campaign
    return (
        <>
            <header>
                <h1>Forbidden Lands</h1>
                <TopNav campaign={campaign} />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <BottomNav />
            </footer>
        </>
    )
}

export default Root
