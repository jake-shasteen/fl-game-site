import { useEffect, useState, PropsWithChildren, Children } from 'react'
import * as d3 from 'd3'
import { hexbin as Hexbin } from 'd3-hexbin'

const hexbin = Hexbin()
    .extent([
        [0, 0],
        [100, 50],
    ])
    .radius(2)

const centers = hexbin.centers()
/**
 * Take an image element as a child
 * Then draw a hex map over it
 **/
function Hexify({ children }: PropsWithChildren) {
    const [imageData, setImageData] = useState<Uint8ClampedArray>()
    useEffect(() => {
        const img = new Image()
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        img.onload = () => {
            context?.drawImage(img, 0, 0)
            setImageData(
                canvas.getContext('2d')?.getImageData(0, 0, 100, 50).data
            )
        }

        img.crossOrigin = 'Anonymous'
        img.src =
            'https://fastly.picsum.photos/id/325/200/300.jpg?hmac=Msn1Ui614fNi6HvLNovytf3IQx4fpJrJYRz59dR6TFQ'
        document.getElementById('mySvg')?.parentElement?.append(canvas)
    }, [])

    return (
        <svg
            id="mySvg"
            viewBox="0 0 100 50"
            style={{
                border: '2px solid black',
            }}
        >
            {centers.map(([x, y], i) => {
                console.log(imageData?.filter((x) => x > 0).length)
                return (
                    <path
                        key={i}
                        transform={'translate(' + x + ',' + y + ')'}
                        d={hexbin.hexagon()}
                        fill={
                            imageData
                                ? 'rgb(' +
                                  imageData[
                                      4 * (Math.floor(y) * 100 + Math.floor(x))
                                  ] +
                                  ',' +
                                  imageData[
                                      4 *
                                          (Math.floor(y) * 100 +
                                              Math.floor(x)) +
                                          1
                                  ] +
                                  ',' +
                                  imageData[
                                      4 *
                                          (Math.floor(y) * 100 +
                                              Math.floor(x)) +
                                          2
                                  ] +
                                  ',' +
                                  imageData[
                                      4 *
                                          (Math.floor(y) * 100 +
                                              Math.floor(x)) +
                                          3
                                  ] +
                                  ')'
                                : 'red'
                        }
                        stroke="black"
                        strokeWidth=".01"
                    />
                )
            })}
        </svg>
    )
}

export default Hexify
