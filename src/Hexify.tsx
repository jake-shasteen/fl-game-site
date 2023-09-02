import { useEffect, useState, PropsWithChildren, Fragment } from 'react'
import * as d3 from 'd3'
import { hexbin as Hexbin } from 'd3-hexbin'

import worldmap from './assets/ravenland-worldmap.png'

const NUM_HEXES_ACROSS = 40
/**
 * Take an image element as a child
 * Then draw a hex map over it
 **/
function Hexify({ children }: PropsWithChildren) {
    const [imageData, setImageData] = useState<Uint8ClampedArray>()
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [hexRadius, setHexRadius] = useState<number>(4)

    useEffect(() => {
        const img = new Image()
        const canvas = document.createElement('canvas')

        img.onload = () => {
            setHeight(img.naturalHeight)
            setWidth(img.naturalWidth)
            // hexWidth = 2 * radius * sin(pi/3)
            // numHexesAcross = width / hexWidth
            // numHexesAcross = width / 2 * radius * sin(pi/3)
            // width = numHexesAcross * 2 * radius * sin(pi/3)
            // width / (numHexesAcross * 2 * sin(pi/3)) = radius
            setHexRadius(
                img.naturalWidth /
                    (2 * NUM_HEXES_ACROSS * Math.sin(Math.PI / 3))
            )
            canvas.width = width
            canvas.height = height
            canvas.getContext('2d')?.drawImage(img, 0, 0, width, height)

            setImageData(
                canvas
                    .getContext('2d')
                    ?.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
                    .data
            )
        }

        img.crossOrigin = 'Anonymous'
        img.src = worldmap
    }, [width, height])

    const hexbin = Hexbin()
        .extent([
            [0, 0],
            [width, height],
        ])
        .radius(hexRadius)

    const centers = hexbin.centers().filter(([x, y]) => x < width && y < height)
    const hexagon = hexbin.hexagon()
    return (
        <svg
            id="mySvg"
            viewBox={`0 0 ${width} ${height}`}
            style={{
                border: '2px solid black',
            }}
        >
            {centers.map(([x, y], i) => {
                const tgt = 4 * (Math.floor(x) + Math.floor(y) * width)
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
                        <rect
                            x={x}
                            y={y}
                            height="1.2rem"
                            width="2rem"
                            fill={`rgba(255,255,255,.2)`}
                            transform={`translate(-${hexRadius / 2},-${
                                14 + hexRadius / 2
                            })`}
                        />
                        <text
                            x={x}
                            y={y}
                            style={{
                                font: 'italic 1rem sans-serif',
                            }}
                            transform={`translate(-${hexRadius / 2},-${
                                hexRadius / 2
                            })`}
                        >
                            {`${
                                '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[
                                    Math.floor(i / (NUM_HEXES_ACROSS + 0.5))
                                ]
                            }${Math.floor((i % (NUM_HEXES_ACROSS + 0.5)) + 1)}`}
                        </text>
                    </Fragment>
                )
            })}
        </svg>
    )
}
export default Hexify
