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
    <a href="https://github.com/rsksmart/rLogin/actions/workflows/ci.yml">
        <img src="https://github.com/rsksmart/rLogin/actions/workflows/ci.yml/badge.svg" alt="npm" />
    </a>
    <a href="https://lgtm.com/projects/g/rsksmart/rLogin/alerts/">
      <img src="https://img.shields.io/lgtm/alerts/github/rsksmart/rLogin" alt="alerts">
    </a>
    <a href="https://lgtm.com/projects/g/rsksmart/rLogin/context:javascript">
      <img src="https://img.shields.io/lgtm/grade/javascript/github/rsksmart/rLogin">
    </a>
    <a href='https://coveralls.io/github/rsksmart/rLogin?branch=develop'>
      <img src='https://coveralls.io/repos/github/rsksmart/rLogin/badge.svg?branch=develop' alt='Coverage Status' />
    </a>
    <a href="https://developers.rsk.co/rif/identity/rlogin/libraries/modal/">
        <img src="https://img.shields.io/badge/-docs-brightgreen" alt="docs" />
    </a>
</p>

rLogin is a tool that allows the front end developer to connect their user with blockchain functionalities and self-sovereign identity models seamlessly. It provides a standard button and a pop-up that, within its different flavors, allows the developer to correctly authenticate a user following the Decentralized Identity and Verifiable Credentials protocols. In addition, it will allow the developer to interact with a user-centric cloud like service called the _data vault_. This service can be used to store and retrieve user's information with their permission.

[Read the docs](https://developers.rsk.co/rif/identity/rlogin/libraries/modal/) for more information and integration guidelines.

## Features

- Supported wallet providers
    - Browser wallets - wallets that are installed as an extension of the web browser
        - [Metamask wallet](https://metamask.io/)
        - [Nifty wallet](https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid)
        - [Liquality wallet](https://liquality.io/atomic-swap-wallet.html)
    - Mobile wallets - wallets that are installed in mobile phone and support [Wallet Connect](https://walletconnect.org/)
        - [rWallet](https://developers.rsk.co/wallet/rwallet/)
        - [Trust wallet](https://trustwallet.com/)
- Supported networks
    - RSK Mainnet
    - RSK Testnet
    - Ethereum Mainnet
    - Ganache (test network)
- Add or Switch to Network if the user is on a different network.
  - Supports RSK networks, but open to PRs for additional chains

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
        rLogin.connect()
          .then((rLoginResponse: any) => {
            const provider = rLoginResponse.provider;
            const dataVault = rLoginResponse.dataVault;
            const disconnect = rLoginResponse.disconnect;

            // save the response to be used later, here we are using React context
            context.rLoginresponse(rLoginResponse)
          })
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

### Flavors

- Fully-decentralized apps: this kind of apps are used only client-side. The front-end will need to know user's address and information for presentational purposes. The core operations are performed using blockchain transactions.

- Open apps: this are apps that can be accessed by anyone controlling a wallet. This apps are usually decentralized applications where user relays some operations to a centralized service. This applications need a challenge-response authentication - use a seamless setup with `@rsksmart/express-did-auth`

- Permissioned apps: for example, apps using Google OAuth to receive user's email are categorized in this flavor. This process of requestion credentials to grant user access is common and usually relies on centralized data silos. This dApp flavor will cover requesting user's Verifiable Credentials in a fully user-centric manner - this is setup in the backend activating _Selective disclosure requests_

- Closed apps: for example, a back office. This are apps that only specific user's can access. This flavor is used to prove the user accessing an app holds or is delegated by a specific identity - perform this validations in your server's business logic

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

## Acknowledgements

Find all acknowledged bugs, future features, and improvements in [repo issues](issues)
