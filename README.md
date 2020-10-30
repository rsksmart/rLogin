<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle">rLogin</h3>
<p align="middle">
    A web tool that combines Web3 and W3C standard protocols to manage user's identity.
</p>

## Quick start

Get RSK standard login modal in your dApp:

1. Build and serve the library<sup><a href="#run-for-development">*</a></sup>
2. Import the library

    ```html
    <script src="http://localhost:3005/main.js"></script>
    ```
2. Connect to rLogin

    ```html
    <script type="text/javascript">
        document.getElementById('login').addEventListener('click', handleLogin);

        function handleLogin() {
            const rLogin = new window.RLogin.default({
                cachedProvider: false,
                providerOptions: {}
            })

            rLogin.connect().then(provider => {
                document.getElementById('address').innerHTML = provider.selectedAddress
            })
        }
    </script>
    ```

    If using backend with DID Auth, pass `backendUrl` key into the `RLogin` options

    ```js
    const rLogin = new window.RLogin.default({
            cachedProvider: false,
            providerOptions: {}
            backendUrl: 'http://localhost:3007'
        })
    ```

The interface is to be defined, this is just a demo.

## What is rLogin?

rlogin is a tool that allows the front end developer to connect their user with blockchain functionalities and self-sovereign identity models seamlessly. It provides a standard button and a pop-up that, within its different flavors, allows the developer to correctly authenticate a user following the Decentralized Identity and Verifiable Credentials protocols. In addition, it will allow the developer to interact with a user-centric cloud like service called the _data vault_. This service can be used to store and retrieve user's information within their permission.

### Flavors

- Fully-decentralized apps: this kind of apps are used only client-side. The front-end will need to know user's address and information for presentational purposes. The core operations are performed using blockchain transactions.

- Open apps: this are apps that can be accessed by anyone controlling a wallet. This apps are usually decentralized applications where user relays some operations to a centralized service. This applications need a challenge-response authentication - use a seamless setup with `@rsksmart/express-did-auth`

- Permissioned apps: for example, apps using Google OAuth to receive user's email are categorized in this flavor. This process of requestion credentials to grant user access is common and usually relies on centralized data cylos. This dApp flavor will cover requesting user's Verifiable Credentials in a fully user-centric manner - this is setup in the backend activating _Selective disclosure requests_

- Closed apps: for example, a back office. This are apps that only specific user's can access. This flavor is used to prove the user accessing an app holds or is delegated by a specific identity - perform this validations in your server's business logic

## Event Listeners

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

## Optional parameters

### network

Specify the network ID that the wallet should use.

```js
const rLogin = new window.RLogin.default({
    network: 31,
})
```

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
