<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle">rLogin</h3>
<p align="middle">
    A web tool that combines Web3 and W3C standard protocols to manage user's identity.
</p>

## Getting started

TBD

<!-- we should add here a sample block for quick-integration -->

## What is rLogin?

rlogin is a tool that allows the front end developer to connect their user with blockchain functionalities and self-sovereign identity models seamlessly. It provides a standard button and a pop-up that, within its different flavors, allows the developer to correctly authenticate a user following the Decentralized Identity and Verifiable Credentials protocols. In addition, it will allow the developer to interact with a user-centric cloud like service called the _data vault_. This service can be used to store and retrieve user's information within their permission.

### Flavors

- Fully-decentralized apps: this kind of apps are used only client-side. The front-end will need to know user's address and information for presentational purposes. The core operations are performed using blockchain transactions.

- Open apps: this are apps that can be accessed by anyone controlling a wallet. This apps are usually decentralized applications where user relays some operations to a centralized service. This applications need a challenge-response authentication

- Permissioned apps: for example, apps using Google OAuth to receive user's email are categorized in this flavor. This process of requestion credentials to grant user access is common and usually relies on centralized data cylos. This dApp flavor will cover requesting user's Verifiable Credentials in a fully user-centric manner

- Closed apps: for example, a back office. This are apps that only specific user's can access. This flavor is used to prove the user accessing an app holds or is delegated by a specific identity

## Run for development

Install dependencies:

```
npm i
```

Run tests:

```
npm test
```

Lint:

```
npm run lint
```

Build for production:

```
npm run build
```
