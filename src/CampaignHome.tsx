import { useLoaderData, Outlet } from 'react-router-dom'

type Loader =
    | { campaign: { id: string; name: string; description?: string } }
    | undefined

function CampaignHome(): JSX.Element {
    const loaderData = useLoaderData() as Awaited<Loader>
    if (!loaderData) {
        return <div>Failed to load data</div>
    }
    const { campaign } = loaderData
    return (
        <>
            <h2>{campaign.name}</h2>
            <Outlet />
        </>
    )
}

export default CampaignHome
