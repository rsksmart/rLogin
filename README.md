<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle">rLogin</h3>
<p align="middle">
    Connect your dApp to RSK blockchain and SSI in breeze
</p>
<p align="middle">
    <a href="https://badge.fury.io/js/%40rsksmart%2Frlogin">
        <img src="https://badge.fury.io/js/%40rsksmart%2Frlogin.svg" alt="npm" />
    </a>
    <a href="https://circleci.com/gh/rsksmart/rLogin">
        <img src="https://img.shields.io/circleci/build/github/rsksmart/rLogin?label=CircleCI" alt="npm" />
    </a>
    <a href="https://lgtm.com/projects/g/rsksmart/rLogin/alerts/">
      <img src="https://img.shields.io/lgtm/alerts/github/rsksmart/rLogin" alt="alerts">
    </a>
    <a href="https://lgtm.com/projects/g/rsksmart/rLogin/context:javascript">
      <img src="https://img.shields.io/lgtm/grade/javascript/github/rsksmart/rLogin">
    </a>
</p>

rLogin is a tool that allows the front end developer to connect their user with blockchain functionalities and self-sovereign identity models seamlessly. It provides a standard button and a pop-up that, within its different flavors, allows the developer to correctly authenticate a user following the Decentralized Identity and Verifiable Credentials protocols. In addition, it will allow the developer to interact with a user-centric cloud like service called the _data vault_. This service can be used to store and retrieve user's information within their permission.

## Features

- Supported wallet providers
    - Browser wallets - wallets that are installed as an extension of the web browser
        - [Metamask wallet](https://metamask.io/)
        - [Nifty wallet](https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid)
    - Mobile wallets - wallets that are installed in mobile phone and support [Wallet Connect](https://walletconnect.org/)
        - [rWallet](https://developers.rsk.co/wallet/rwallet/)
        - [Trust wallet](https://trustwallet.com/)
- Supported networks
    - RSK Mainnet
    - RSK Testnet
    - Ethereum Mainnet
    - Ganache (test network)

> We express support for wallet providers and networks that are manually tested against each PR as QA process. Formalizing manual test schedule and automated tests are a work in progress, and are planned in the scope of this project.

## Quick start

1. Install rLogin

    ```
    npm i @rsksmart/rlogin
    ```

2. Create `rLogin` DOM element, configure supported networks and wallet providers

    ```typescript
    import RLogin from '@rsksmart/rlogin'
    import WalletConnectProvider from '@walletconnect/web3-provider'

    export const rLogin = new RLogin({
      cachedProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: 'https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0',
              30: 'https://public-node.rsk.co',
              31: 'https://public-node.testnet.rsk.co'
            }
          }
        }
      },
      supportedChains: [1, 30, 31]
    })
    ```
    
    > Sample: https://github.com/rsksmart/rif-identity-manager/blob/main/src/rLogin.ts
    
3. Show the pop-up to the user

    ```typescript
    const handleLogin = () => {
        rLogin.connect().then((provider: any) => context?.setProvider(provider))
            .catch((err: string) => console.log(err))
    }
    ```
    
    > Sample: https://github.com/rsksmart/rif-identity-manager/blob/main/src/app/LoginScreen.tsx
    
4. Request RPC methods

    ```
    export const getAccounts = (provider: any) => provider.request({ method: 'eth_accounts' })
    ```
    
    Or use `provider` as Web3 provider for your client of preference: [`Web3.js`](https://github.com/ethereum/web3.js/), [`ethjs`](https://github.com/ethjs/ethjs), [`ethers.js`](https://github.com/ethers-io/ethers.js/) or other.
    
    > Sample: https://github.com/rsksmart/rif-identity-manager/blob/main/src/helpers.ts
    
As an example, [this PR](https://github.com/rsksmart/rif-identity-manager/pull/2) can be used as example-driven integration guide.
    
**For HTML-only apps:**

```html
<script src="http://unpkg.com/@rsksmart/rlogin"></script>
<script type="text/javascript">
    const rLogin = new window.RLogin.default({
        providerOptions: {} // see above options
    })

    function handleLogin() {
        rLogin.connect().then(provider => {
            document.getElementById('address').innerHTML = provider.selectedAddress
        })
    }

    document.getElementById('login').addEventListener('click', handleLogin);
</script>
```

### Flavors

- Fully-decentralized apps: this kind of apps are used only client-side. The front-end will need to know user's address and information for presentational purposes. The core operations are performed using blockchain transactions.

- Open apps: this are apps that can be accessed by anyone controlling a wallet. This apps are usually decentralized applications where user relays some operations to a centralized service. This applications need a challenge-response authentication - use a seamless setup with `@rsksmart/express-did-auth`

- Permissioned apps: for example, apps using Google OAuth to receive user's email are categorized in this flavor. This process of requestion credentials to grant user access is common and usually relies on centralized data cylos. This dApp flavor will cover requesting user's Verifiable Credentials in a fully user-centric manner - this is setup in the backend activating _Selective disclosure requests_

- Closed apps: for example, a back office. This are apps that only specific user's can access. This flavor is used to prove the user accessing an app holds or is delegated by a specific identity - perform this validations in your server's business logic

## EIP-1193 support

rLogin express support for [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) propossal for a _Ethereum Provider JavaScript API_. Wallet providers that implement EIP-1193 are prone to be integrated seamlessly into this library.

Read this sections to understand how to handle EIP-1193 rLogin.

### accountsChanged

Event is fired when the user changes the account/persona.

```js
rLogin.on("accountsChanged", (accounts) => {
    document.getElementById('address').innerHTML = 'Account: ' + accounts[0]
});
```

### chainChanged

Event is fired when the user changes the network in the wallet.

```js
rLogin.on("chainChanged", (chainId) => {
    document.getElementById('chainId').innerHTML = 'ChainId: ' + parseInt(chainId)
})
```

#### About Metamask and chain ID change

Changing the chain may result in the wallet refreshing the page. If this is not the desired effect, and the wallet supports EIP-1198 `chainChanged`, you can use:

```javascript
window.ethereum.autoRefreshOnNetworkChange = false
```

> Reference: https://github.com/MetaMask/metamask-extension/pull/6330

When loading the wallet you will find a console alert

MetaMask will soon stop reloading pages on network change. For more information, see: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-autorefreshonnetworkchange

#### About Nifty and RPC `request` method

Nifty does not support EIP-1193 regarding `request` API, it still uses `send` method as API for sending RPCs. Consider this in your implementation.

Follow up the feature request: [poanetwork/nifty-wallet#421](https://github.com/poanetwork/nifty-wallet/issues/421)

## Optional parameters

### supportedNetworks

Specify the network IDs that the dApp supports and the wallet should use.

```js
const rLogin = new window.RLogin.default({
    supportedNetworks: [30, 31],
})
```

### `web3modal` options

Options available for [`web3modal`](https://github.com/web3Modal/web3modal/) are available for `rLogin`. To understand how this works go to section [_the code_](#the-code).

Wallet providers and networks that are listed in [_features_](#features) section are supported and tested, but other can be provided seamlessly with `web3modal` options. We cannot assure quality for using other providers or networks.

## Styling the modal and interface

The modal comes with basic RIF styling and can be overwritten using CSS. All of the elements contain class and id selectors to allow style customizations. A list of the selectors can be found in the [cssSelector.ts constants file](https://github.com/rsksmart/rLogin/tree/master/src/constants/cssSelectors.ts).

## The code

The tool tries not to re-implement functionalities that are provided by other libraries. The work is strongly based on:

- [`web3modal`](https://github.com/web3Modal/web3modal/)
    - Wallet provider integrations are imported from npm package
    - Core and components are re-implemented to enable developing custom UX flow and custom components

## Run for development

**Install dependencies** - downloads and install dependencies from `npm`

```
npm i
```

**Run tests** - runs with `jest`

```
npm test
```

Currently, there are no tests :(. Please test it with a [sample app](#sample-apps).

The best way to test it is to run `npm build:dev` to update the bundle after saving files. You will need to reload page after rebuilding, that is not automated yet.

**Lint** - runs `eslint` syntax checks

```
npm run lint
```

**Build for production** - builds `umd` into `dist/main.js`

```
npm run build
```

**Build in watch mode** - builds each time a file in `src/` is updated

```
npm run build:dev
```

**Serve the library** - serves the library in `http://localhost:5005`

```
npm run serve
```

> Metamask cannot be accessed without `http` - see https://ethereum.stackexchange.com/a/62217/620

## Sample apps

Please first build for production.

| Flavor | Import from | Location | Command |  |
| - | - | - | - | - |
| Fully-decentralized | HTML DOM | _./sample/decentralized_ | `npm run sample:dapp` | Serves the library in _http://localhost:3005_ and a dApp in _http://localhost:3006_. Go to _3006_ with your browser |
| Open app | HTML DOM | _./sample/with_be_ | `npm run sample:open` | Serves the library in _http://localhost:3005_, dApp in _http://localhost:3006/?backend=yes_ and back end in _http://localhost:3007_. This mode will not ask for Data Vault access. Go to _3006_ with your browser |
| Permissioned app | HTML DOM | _./sample/decentralized_ | `npm run sample:permissioned` | Serves the library in _http://localhost:3005_, dApp in _http://localhost:3006_ and back end in _http://localhost:3007_. This mode will ask for Data Vault access. Go to _3006_ with your browser |
