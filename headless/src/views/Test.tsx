import { useState } from 'react'
import styled from 'styled-components'
import { apiEndpointCall } from 'utils/endpointApiCall'
import { TestingModule } from 'components/TestingModule'
import { TestingRoles } from 'components/TestingRoles'
import { TestingUploadImages } from 'components/TestingUploadImages'

const Main = styled.main`
  padding-top: 240px;
`

const Test = () => {
  const sendSlowUpload = async () => {
    console.log('Client: Starting slow upload...')

    const slowStream = new ReadableStream({
      start(controller) {
        let count = 0

        const interval = setInterval(() => {
          if (count < 8) {
            const chunk = `Chunk ${count + 1} of slow data.\n`
            controller.enqueue(new TextEncoder().encode(chunk))
            count++
            console.log(`Client: sending chunk ${chunk} of slow data.`)
          } else {
            clearInterval(interval)
            controller.close()
            console.log('Client: Finished enqueuing all chunks.')
          }
        }, 2000)
      },
    })
    const response = await apiEndpointCall(
      'post',
      'file/dir/upload-slowly',
      slowStream
    )
    console.log('Client: Upload result:', response)
  }

  return (
    <Main data-aos="fade" className="section">
      <TestingUploadImages />
      <TestingModule />
      <h3 className="b900 margin_b_60_30 blue">Additional Forms</h3>
      <TestingRoles />
      <button className="grey_button margin_b_60_30" onClick={sendSlowUpload}>
        Send Slow Upload
      </button>
    </Main>
  )
}
export default Test
