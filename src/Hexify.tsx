import { useEffect, useState, PropsWithChildren, Fragment } from 'react'
import * as d3 from 'd3'
import { hexbin as Hexbin } from 'd3-hexbin'

import worldmap from './assets/ravenland-worldmap.png'

const STATIC_WIDTH = 300
const STATIC_HEIGHT = 220
const HEX_RADIUS = 4

/**
 * Take an image element as a child
 * Then draw a hex map over it
 **/
function Hexify({ children }: PropsWithChildren) {
    const [imageData, setImageData] = useState<Uint8ClampedArray>()
    useEffect(() => {
        const img = new Image()
        const canvas = document.createElement('canvas')
        canvas.width = STATIC_WIDTH
        canvas.height = STATIC_HEIGHT
        const context = canvas.getContext('2d')

        img.onload = () => {
            context?.drawImage(img, 0, 0, STATIC_WIDTH, STATIC_HEIGHT)
            setImageData(
                canvas
                    .getContext('2d')
                    ?.getImageData(0, 0, STATIC_WIDTH, STATIC_HEIGHT).data
            )
        }
        img.crossOrigin = 'Anonymous'
        img.src = worldmap
    }, [])

    const hexbin = Hexbin()
        .extent([
            [0, 0],
            [STATIC_WIDTH, STATIC_HEIGHT],
        ])
        .radius(HEX_RADIUS)

    const centers = hexbin.centers()
    const hexagon = hexbin.hexagon()
    console.log(imageData?.filter((x) => x == 0).length)
    return (
        <svg
            id="mySvg"
            viewBox={`0 0 ${STATIC_WIDTH} ${STATIC_HEIGHT}`}
            style={{
                border: '2px solid black',
            }}
        >
            {centers.map(([x, y], i) => {
                const tgt = 4 * (Math.floor(x) + Math.floor(y) * STATIC_WIDTH)
                return (
                    <Fragment key={i}>
                        <path
                            transform={`translate(${x},${y})`}
                            d={hexagon}
                            stroke="black"
                            strokeWidth=".05"
                            fill={
                                imageData
                                    ? `rgba(${imageData[tgt]},${
                                          imageData[tgt + 1]
                                      },${imageData[tgt + 2]},${
                                          imageData[tgt + 3]
                                      })`
                                    : 'red'
                            }
                        />
                        <text
                            x={x}
                            y={y}
                            style={{
                                font: 'italic 5% sans-serif',
                            }}
                            transform={`translate(-${HEX_RADIUS / 2},-${
                                HEX_RADIUS / 2
                            })`}
                        >
                            {`${
                                'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(i / 44)]
                            }${Math.floor(i % 44)}`}
                        </text>
                    </Fragment>
                )
            })}
        </svg>
    )
}
// TODO: Calculate correct wrapping, instead of using 44
export default Hexify
