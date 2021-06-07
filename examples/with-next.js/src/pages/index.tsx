import { Video } from '@signalwire/js'
import { useEffect, useState } from 'react'
import { useAppState } from '../components/AppController'
import { JoinWidget } from '../components/JoinWidget'
import { VideoWidget } from '../components/VideoWidget'
import Layout from '../components/Layout'

const Steps = () => {
  const state = useAppState()
  const [client, setClient] = useState<Video.Client>()

  useEffect(() => {
    if (state.status === 'authorized' && !client) {
      Video.createClient({
        // host: 'relay.swire.io',
        token: state.token,
        autoConnect: true,
      }).then((c: any) => {
        setClient(c)
      })
    } else if (state.status === 'idle' && client) {
      setClient(undefined)
    }
  }, [state])

  if (state.status === 'authorized') {
    if (client) {
      return (
        <VideoWidget
          client={client}
          roomName={state.roomName}
          userName={state.userName}
        />
      )
    }

    return <h1>💈 Creating the client...</h1>
  }

  return <JoinWidget />
}

const IndexPage = () => {
  return (
    <Layout title='Home | Next.js + VideoSDK Example'>
      <Steps />
    </Layout>
  )
}

export default IndexPage
