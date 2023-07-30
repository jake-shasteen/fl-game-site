import baseworldmap from '../public/baseworldmap.webp'
import './WorldMap.css'

function WorldMap() {
    return (
        <>
            <h2>World Map</h2>
            <img src={baseworldmap} />
            <h3>Copenhagen</h3>
            <h3>Hamburg</h3>
            <h3>Berlin</h3>
            <h3>Prague</h3>
        </>
    )
}

export default WorldMap
