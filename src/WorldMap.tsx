import worldmap from '../src/assets/ravenland-worldmap.png'
import Hexify from './Hexify'
import './WorldMap.css'

function WorldMap() {
    return (
        <>
            <h2>World Map</h2>
            <img src={worldmap} />
            <Hexify></Hexify>
            <h3>Place 1</h3>
            <h3>Place 2</h3>
        </>
    )
}

export default WorldMap
