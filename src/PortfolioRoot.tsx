import App from './App'
import LayeredPortfolio from './components/LayeredPortfolio'

const PortfolioRoot = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const isRetroEmbed = searchParams.get('layer') === 'retro-embed'

  return isRetroEmbed ? <App /> : <LayeredPortfolio />
}

export default PortfolioRoot
