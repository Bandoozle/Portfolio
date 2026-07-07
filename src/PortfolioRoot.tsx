import { useCallback, useEffect, useState } from 'react'
import App from './App'
import LayeredPortfolio from './components/LayeredPortfolio'

const getLayerFromUrl = () => new URLSearchParams(window.location.search).get('layer')

const PortfolioRoot = () => {
  const [layer, setLayer] = useState(getLayerFromUrl)

  useEffect(() => {
    const onPopState = () => setLayer(getLayerFromUrl())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const handleBackToProfessional = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('layer')
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setLayer(getLayerFromUrl())
  }, [])

  if (layer === 'retro-embed') {
    return <App onBackToProfessional={handleBackToProfessional} />
  }

  return <LayeredPortfolio />
}

export default PortfolioRoot
