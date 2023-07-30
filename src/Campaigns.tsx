import React from 'react'
import { useLoaderData, NavLink } from 'react-router-dom'

type Loader = undefined | { id: string; name: string; description?: string }[]

function Campaigns() {
    const loaderData = useLoaderData() as Awaited<Loader>
    if (!loaderData) {
        return <div>No campaigns yet.</div>
    }
    return (
        <>
            <h2>Campaigns</h2>
            {loaderData.map((campaign) => (
                <React.Fragment key={campaign.id}>
                    <h3>
                        <NavLink to={`/campaigns/${campaign.id}`}>
                            {campaign.name}
                        </NavLink>
                    </h3>
                    <div>{campaign?.description || ''}</div>
                </React.Fragment>
            ))}
        </>
    )
}

export default Campaigns
