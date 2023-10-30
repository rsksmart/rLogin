import rootstockChains from './rootstock-chains.js'

async function queryChainData (response) {
  const provider = response?.provider
  if (!provider) return
  const [account] = await provider.request({ method: 'eth_requestAccounts' })
  const chainId = parseInt(await provider.request({ method: 'eth_chainId' }), 16)
  const supportedChains = rootstockChains.map(chain => parseInt(chain.chainId, 16)).join(', ')
  showChainData(account, chainId, supportedChains)
}

function showChainData (account, chainId, supportedChains) {
  document.getElementById('login-section').style.display = 'none'
  document.getElementById('connected-section').style.display = 'block'
  const errMsg = 'not connected'
  document.getElementById('wallet-address').innerHTML = account ?? errMsg
  document.getElementById('chain-id').innerHTML = chainId ?? errMsg
  document.getElementById('supported-chains').innerHTML = supportedChains ?? errMsg
}

function showLogin () {
  document.getElementById('login-section').style.display = 'block'
  document.getElementById('connected-section').style.display = 'none'
}

function addButtonListeners () {
  document.getElementById('login-button').addEventListener('click', () => window.rLogin.connect())
  document.getElementById('disconnect-button').addEventListener('click', showLogin)
  document.getElementById('change-network-button').addEventListener('click', () => window.rLogin.showChangeNetwork())
}

function main () {
  // eslint-disable-next-line new-cap
  const rLogin = new window.RLogin.default({
    ethereumChains: rootstockChains
  })
  window.rLogin = rLogin
  rLogin.on('connect', queryChainData)
  rLogin.on('chainChanged', queryChainData)
  rLogin.on('disconnected', showLogin)
  addButtonListeners()
}

main()
