import Head from 'next/head'
import isolde from '../public/isolde.json'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Champions</title>
        <meta name="description" content="Combat tracking for Champions 6E" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>

  )
}
