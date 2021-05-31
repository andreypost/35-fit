import React, { useRef } from 'react'

interface canvasProps {
  width: string
  height: string
  border: string
}

const Canvas: React.FC<canvasProps> = ({ width, height, border }: canvasProps): any => {
  const contexRef = useRef<HTMLCanvasElement | null>(null)
  const handleContexLine = (e: any) => {
    const canvas = contexRef.current
    const ctx = canvas?.getContext('2d')
    ctx?.lineTo(e.clientX, e.clientY)
    ctx?.stroke()
    // context?.beginPath()
    // context?.arc(95, 50, 40, 0, 2 * Math.PI)
    // context?.fill()
  }
  const submitBlobData = async () => {
    const canvas = contexRef.current
    const imageBlob: any = await new Promise(resolve => canvas?.toBlob(resolve, 'image/png'))
    const formData = new FormData()
    formData.append('image', imageBlob, 'image.png')
    for (const d of formData) {
      console.log(d, imageBlob)
    }
  }
  return (
    <>
      <canvas width={width} height={height} style={{ border }} ref={contexRef} onMouseMove={handleContexLine} />
      <input type="button" value="send blob data" onClick={submitBlobData} />
    </>
  )
}
export default Canvas
