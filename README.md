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
2. Try

    ```html
    <html>
    <head>
        <title>rLogin | dApp sample</title>
        <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap" rel="stylesheet">
    </head>
    <body>
        <div style="width: 100%; height: 100%;">
        <button id="login">login with rLogin</button>
        <p id="address">please login</button>
        </div>

        <script src="http://localhost:3005/main.js"></script>
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
    </body>
    </html>
    ```

The interface is to be defined, this is just a demo.

## What is rLgin?

rlogin is a tool that allows the front end developer to connect their user with blockchain functionalities and self-sovereign identity models seamlessly. It provides a standard button and a pop-up that, within its different flavors, allows the developer to correctly authenticate a user following the Decentralized Identity and Verifiable Credentials protocols. In addition, it will allow the developer to interact with a user-centric cloud like service called the _data vault_. This service can be used to store and retrieve user's information within their permission.

### Flavors

- Fully-decentralized apps: this kind of apps are used only client-side. The front-end will need to know user's address and information for presentational purposes. The core operations are performed using blockchain transactions.

- Open apps: this are apps that can be accessed by anyone controlling a wallet. This apps are usually decentralized applications where user relays some operations to a centralized service. This applications need a challenge-response authentication

- Permissioned apps: for example, apps using Google OAuth to receive user's email are categorized in this flavor. This process of requestion credentials to grant user access is common and usually relies on centralized data cylos. This dApp flavor will cover requesting user's Verifiable Credentials in a fully user-centric manner

- Closed apps: for example, a back office. This are apps that only specific user's can access. This flavor is used to prove the user accessing an app holds or is delegated by a specific identity

## The code

The tool tries not to re-implement functionalities that are provided by other libraries. The work is strongly based on:

- [`web3modal`](https://github.com/web3Modal/web3modal/)
    - Wallet provider integrations are imported from npm package
    - Core and components are re-implemented to enable developing custom UX flow and custom components

## Run for development

Install dependencies - downloads and install dependencies from `npm`

```
npm i
```

Run tests - runs with `jest`

```
npm test
```

Lint - runs `eslint` syntax checks

```
npm run lint
```

Build for production - builds `umd` into `dist/main.js`

```
npm run build
```

Build in watch mode - builds each time a file in `src/` is updated

```
npm run build:dev
```

Serve the library - serves the library in `http://localhost:5005`

```
npm run serve
```

> Metamask cannot be accessed without `http` - see https://ethereum.stackexchange.com/a/62217/620

## Sample apps

Please first build for production.

| Flavor | Import from | Location | Command |  |
| - | - | - | - | - |
| Fully-decentralized | HTML DOM | _./sample/decentralized_ | `npm run sample` | Serves the library in _http://localhost:3006_ and a dApp in _http://localhost:3006_. Go to _3006_ with your browser |
