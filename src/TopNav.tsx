import { NavLink } from 'react-router-dom'

import './TopNav.css'

type Loader = {
    campaign?: {
        id: string
    }
}

function TopNav(props: Loader) {
    if (!props?.campaign) {
        return (
            <nav>
                <h2>
                    <NavLink to={`/campaigns`}>Campaigns</NavLink>
                </h2>
            </nav>
        )
    }
    const { campaign } = props
    return (
        <nav>
            <h2>
                <NavLink to={`/campaigns`}>Campaigns</NavLink>
            </h2>
            <h2>
                <NavLink to={`/campaigns/${campaign.id}/maps/worldmap`}>
                    Map
                </NavLink>
            </h2>
            <h2>
                <NavLink to={`/campaigns/${campaign.id}/journal`}>
                    Journal
                </NavLink>
            </h2>
            <h2>
                <NavLink to={`/campaigns/${campaign.id}/characters`}>
                    Characters
                </NavLink>
            </h2>
            <h2>
                <NavLink to={`/campaigns/${campaign.id}/treasures`}>
                    Treasures
                </NavLink>
            </h2>
            <h2>
                <NavLink to={`/campaigns/${campaign.id}/strongholds`}>
                    Strongholds
                </NavLink>
            </h2>
        </nav>
    )
}

export default TopNav
