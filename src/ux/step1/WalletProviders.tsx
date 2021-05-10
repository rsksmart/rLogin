// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Provider } from './Provider'
import { IProviderUserOptions } from 'web3modal'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { PROVIDERS_WRAPPER_CLASSNAME, ANCHOR_CLASSNAME, PROVIDERS_FOOTER_TEXT_CLASSNAME } from '../../constants/cssSelectors'
import Loading from '../../ui/shared/Loading'

interface IWalletProvidersProps {
  userProviders: IProviderUserOptions[]
}

const ProvidersWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  padding: 8px;
`

const NoWalletAnchor = styled.a`
  color: #008FF7;
  text-decoration: none;
  :hover {
    color: #4386c6;
  }
`

export const WalletProviders = ({ userProviders }: IWalletProvidersProps) => {
  const [waitingForProvider, setWaitingForProvider] = useState<boolean>(false)

  // return function is for when the component unmounts
  useEffect(() => {
    return () => setWaitingForProvider(false)
  }, [])

  const handleOnClick = (provider: any) => {
    setWaitingForProvider(true)
    return provider.onClick().catch(() => setWaitingForProvider(false))
  }

  return (
    waitingForProvider
      ? <Loading size={10} color="#008FF7" />
      : <>
        <Header2>Connect your wallet</Header2>
        <ProvidersWrapper className={PROVIDERS_WRAPPER_CLASSNAME}>
          {userProviders.map(provider =>
            provider ? (
              <Provider
                key={provider.name}
                name={provider.name}
                logo={provider.logo}
                description={provider.description}
                onClick={() => handleOnClick(provider)}
              />
            ) : null
          )}
        </ProvidersWrapper>
        <Paragraph className={PROVIDERS_FOOTER_TEXT_CLASSNAME}>
        No wallet?
          {' '}
          <NoWalletAnchor href="https://developers.rsk.co/wallet/use/" target="_blank" className={ANCHOR_CLASSNAME}>
          Get one here!
          </NoWalletAnchor>
        </Paragraph>
      </>
  )
}
