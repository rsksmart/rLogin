<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle">rLogin</h3>
<p align="middle">
    Login tool for RSK
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
    <a href="https://developers.rsk.co/rif/rlogin/">
        <img src="https://img.shields.io/badge/-docs-brightgreen" alt="docs" />
    </a>
</p>

Integrate rLogin into your app and allow your users to choose their favorite wallets to login. With a single tool you will get connected to their wallet using an API compatible with Metamask, continue developing as you did.

<p align="middle">
    <img src="https://i.imgur.com/yARsVXh.png" />
</p>

Wallet support:
- Browser wallets: Metamask, Nifty, Liquality
- Mobile wallets via Wallet Connect
- Custodial wallets: Portis, Torus (beta)
- Hardware wallets: Ledger, Trezor, D'Cent

Network support:
- RSK Mainnet, RSK Testnet
- Etheruem, Ropsten, Kovan, Rinkeby, Gorely

EIP 1193 support

Clients support:
- `ethers`, `web3.js` and others

## Getting started

Follow this guide to configure rLogin in minutes

Sample app: [`rsksmart/rLogin-sample-apps`](https://github.com/rsksmart/rLogin-sample-apps/tree/main/basic-dapp)

### 1. Install rLogin

```
yarn add @rsksmart/rlogin
```

Add wallets peer dependecies:

| Wallet provider | Required package |
| - | - |
| Browser wallets | none |
| Wallet Connect | `@walletconnect/web3-provider` |
| Portis | `@portis/web3` |
| Torus (beta) | `@toruslabs/torus-embed` |
| Trezor | `@rsksmart/rlogin-trezor-provider` |
| Ledger | `@rsksmart/rlogin-ledger-provider` |
| D'Cent | `@rsksmart/rlogin-dcent-provider` |

```
yarn add @walletconnect/web3-provider @portis/web3 @toruslabs/torus-embed @rsksmart/rlogin-trezor-provider @rsksmart/rlogin-ledger-provider @rsksmart/rlogin-dcent-provider
```

### 2. Create the DOM element

```typescript
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import Torus from '@toruslabs/torus-embed'
import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider'
import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider'
import { dcentProviderOptions } from '@rsksmart/rlogin-dcent-provider'

const rpcUrls = {
  30: 'https://public-node.rsk.co',
  31: 'https://public-node.testnet.rsk.co',
}

const supportedChains = Object.keys(rpcUrls).map(Number)

export const rLogin = new RLogin({
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: rpcUrls
      }
    },
    portis: {
      package: Portis,
      options: {
        id: "a1c8672b-7b1c-476b-b3d0-41c27d575920",
        network: {
          nodeUrl: 'https://public-node.testnet.rsk.co',
          chainId: 31,
        }
      }
    },
    torus: {
        package: Torus,
    },
    'custom-ledger': ledgerProviderOptions,
    'custom-dcent': dcentProviderOptions,
    'custom-trezor': {
      ...trezorProviderOptions,
      options: {
        manifestEmail: 'info@iovlabs.org',
        manifestAppUrl: 'https://basic-sample.rlogin.identity.rifos.org/',
      }
    }
  },
  rpcUrls,
  supportedChains
})
```

> We usually put this all together in a single file called `rlogin.ts` and export a single instance of `RLogin`. This ensures a single DOM element is creted.

### 3. Connect!

```typescript
import { providers } from 'ethers'

const login = () => rLogin.connect()
    .then(({ provider, disconnect }) => {
        const provider = new providers.Web3Provider(provider)
        provider.getSigner(0).getAddress().then(console.log)
    })
```

You can use `provider` with your client of preference: [`Web3.js`](https://github.com/ethereum/web3.js/), [`ethjs`](https://github.com/ethjs/ethjs), [`ethers.js`](https://github.com/ethers-io/ethers.js/) or other.

Use `disconnect` to disconnect from the selected wallet. This single function simplifies handling the wallet specifics at all.

## Read the docs

Read more in our [docs](https://developers.rsk.co/rif/rlogin/):
- [Sample apps](https://developers.rsk.co/rif/rlogin/samples)
- [Features](https://developers.rsk.co/rif/rlogin/features): i18n, theming, dark/light, listeners, triggers
- [Integrated backend authentication](https://developers.rsk.co/rif/rlogin/authentication)
- [Migrating from other modals](https://developers.rsk.co/rif/rlogin/migrating): `web3modal` or `web3react`

## Run for development

**Install dependencies** - downloads and install dependencies from `npm`

```
npm i
```

### Testing

**Run tests** - runs with `jest`

```
npm test
```

**Lint** - runs `eslint` syntax checks

```
npm run lint
```

### Building

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

### The code

The key points:
- `src/RLogin.ts` is the API. There we create the DOM element.
- `src/Core.ts` handles the whole UX. It connects to the wallet, does the authentication, show the modal when triggered and so on.
- `src/ux` has the different flows for the UX described. You will finde _step1_ or _confirmInformation_
- `src/ui` are the visual components of the rLogin
- `src/lib` has the wallet specifics and authentication implementations

The rLogin depends on `web3modal` for some functionality. We imported and adapted part of the code to enable us expanding the UX.

### Run the sample apps

This apps are built specifically for e2e testing but you can run them to test your changes. We also recommend to `yarn link` and use [`rLogin-sample-apps`](https://github.com/rsksmart/rLogin-sample-apps) to test them too

**Basic app** (no backend) - serves the rLogin and the front-end

```
npm run sample:dapp
```

**Open flavor** - will run a backend with authentication installed

```
npm run sample:open
```

**Permissioned flavor** - will also request specific information and connect to the RIF Data Vault

```
npm run sample:permissioned
```

### e2e eith Cypress

We use [Cypress](https://www.cypress.io/) to do the e2e. The apps used to do it are described above. You will also find [`@rsksmart/mock-web3-provider`](https://github.com/rsksmart/mock-web3-provider), this is our Mock simulating Metamask.

To run the cypress e2e testing scripts, start the app using the permissioned flavor.

```
npm run sample:permissioned
```

Then in a new terminal, start the Cypress app and interact with the tests:

```
npm run cypress:open
```

The Cypress tests can also be run in a headless browser by running the command:

```
npm run cypress:run
```

### Branching model

- `master` has latest release. Merge into `master` will deploy to npm. Do merge commits.
- `develop` has latest approved PR. PRs need to pass `ci`. Do squash & merge.
- Use branches pointing to `develop` to add new PRs.
- Do external PRs against latest commit in `develop`.
