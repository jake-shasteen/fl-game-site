import { useEffect, PropsWithChildren } from 'react'
import * as d3 from 'd3'
import { hexbin as Hexbin } from 'd3-hexbin'

const hexbin = Hexbin()
    .extent([
        [0, 0],
        [100, 50],
    ])
    .radius(3)

const centers = hexbin.centers()
/**
 * Take an image element as a child
 * Then draw a hex map over it
 **/
function Hexify({ children }: PropsWithChildren) {
    return (
        <>
            <svg
                viewBox="0 0 100 50"
                style={{
                    border: '2px solid black',
                }}
            >
                {centers.map(([x, y], i) => (
                    <path
                        transform={'translate(' + x + ',' + y + ')'}
                        d={hexbin.hexagon()}
                        fill="white"
                        stroke="black"
                        stroke-width=".2%"
                    />
                ))}
            </svg>
        </>
    )
}

export default Hexify
