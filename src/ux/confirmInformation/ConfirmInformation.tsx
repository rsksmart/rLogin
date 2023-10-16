import React, { useState } from 'react'
import { SD } from '../../lib/sdr'
import { Header2, SmallSpan, typeShared } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import { credentialValueToText } from '../../vc-json-schema-adapter'
import { Trans } from 'react-i18next'
import { getChainName } from '../../adapters'
import { IProviderUserOptions } from 'web3modal'
import Checkbox from '../../ui/shared/Checkbox'
import { getPeerInfo } from './getPeerLogo'
import ConfirmInWallet from '../../ui/shared/ConfirmInWallet'
import styled from 'styled-components'

import { SuccessIcon, CopyIcon, LinkIcon } from './icons'

import { LIST_TITLE, LIST_DESCRIPTION, LIST_NETWORK, LIST_CLICKABLE } from '../../constants/cssSelectors'
import { DONT_SHOW_AGAIN_KEY } from '../../constants'
import { InfoOptions } from './InfoOptions'
import { AddEthereumChainParameter } from '../wrongNetwork/changeNetwork'

interface ConfirmInformationProps {
  chainId: number | undefined
  address: string | undefined
  displayMode: boolean
  sd: SD | undefined
  providerUserOption: IProviderUserOptions
  provider: any
  onConfirm: () => Promise<any>
  onCancel: () => void
  infoOptions: InfoOptions
  disconnect: () => void
  ethereumChains?: Map<number, AddEthereumChainParameter>
}

export function ConfirmInformation ({ displayMode, chainId, address, providerUserOption, sd, provider, onConfirm, onCancel, infoOptions, disconnect, ethereumChains }: ConfirmInformationProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dontShowAgainSelected, setDontShowAgainSelected] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    await onConfirm()

    setIsLoading(false)
  }

  const peerWallet = getPeerInfo(provider?.wc?.peerMeta)

  const isHardwareWallet = provider?.isLedger || provider?.isTrezor || provider?.isDCent

  const chainName = chainId ? ethereumChains ? (ethereumChains.get(chainId)?.chainName ?? '') : getChainName(chainId) : ''

  return !isLoading
    ? <>
      {!displayMode && <HeaderContainer>
        <SuccessIconImg src={SuccessIcon} alt="success" />
        <Header2><Trans>Successfully connected</Trans></Header2>
      </HeaderContainer>}

      <CenterContent>
        {providerUserOption && (
          <LogoWrapper>
            <img src={providerUserOption.logo} alt={providerUserOption.name} />
          </LogoWrapper>
        )}
        {peerWallet && <LogoWrapper>
          <img src={peerWallet.logo} alt={peerWallet.name} />
        </LogoWrapper>}
      </CenterContent>

      <List>
        <Column>
          <Description>{shortAddress(address)}</Description>
          <Title><Trans>Wallet</Trans>:</Title>
          {peerWallet && <Title><Trans>Connected wallet</Trans>:</Title>}
          <Title><Trans>Network</Trans>:</Title>
          {isHardwareWallet && <Title><Trans>Derivation path</Trans>:</Title>}
          {sd && Object.keys(sd.claims).map(key => <Title key={`claim-key-${key}`}>{key}:</Title>)}
          {sd && Object.keys(sd.credentials).map(key => <Title key={`credential-key-${key}`}>{key}:</Title>)}
        </Column>
        <Column>
          <Title>
            <Clickable onClick={() => navigator.clipboard.writeText(address!)}><Trans>copy</Trans> <img src={CopyIcon} alt="copy" /></Clickable>
            {infoOptions[chainId!] && <>
              <PaddedClickable onClick={() => window.open(`${infoOptions[chainId!].addressBaseURL}${address}`, '_blank')!.focus()}><Trans>explorer</Trans> <img src={LinkIcon} alt="explorer" /></PaddedClickable>
            </>}
          </Title>
          <Description>{providerUserOption.name}</Description>
          {peerWallet && <Description>{peerWallet.name}</Description>}
          <Network title={chainName}>{chainName}</Network>
          {isHardwareWallet && <Description>{provider.dpath || provider.path}</Description>}
          {sd && Object.keys(sd.claims).map(key => <Description key={`claim-value-${key}`}>{sd.claims[key]}</Description>)}
          {sd && Object.keys(sd.credentials).map(key => <Description key={`credential-value-${key}`}>{credentialValueToText(key, sd.credentials[key])}</Description>)}
        </Column>
      </List>

      <CenterContent>
        <Disclaimer>
          You are sharing this information with {window.location.href}
        </Disclaimer>
      </CenterContent>

      {!displayMode ? (
        <>
          <CenterContent>
            <Button variant="secondary" onClick={onCancel} disabled={isLoading} className="cancel"><Trans>Cancel</Trans></Button>
            <Button onClick={handleSubmit} disabled={isLoading} className="confirm"><Trans>Confirm</Trans></Button>
          </CenterContent>
          <CenterContent>
            <label style={{ marginTop: 20 }}>
              <Checkbox checked={dontShowAgainSelected} onChange={() => setDontShowAgainSelected(prev => {
                localStorage.setItem(DONT_SHOW_AGAIN_KEY, JSON.stringify(!prev))
                return !prev
              })} />
              <SmallSpan><Trans>Do not show again</Trans></SmallSpan>
            </label>
          </CenterContent>
        </>
      ) : <>
        <CenterContent>
          <Button variant="secondary" onClick={disconnect} disabled={isLoading} className="rlogin-info-disconnect"><Trans>Disconnect</Trans></Button>
        </CenterContent>
      </>}
    </>
    : <ConfirmInWallet providerName={providerUserOption ? providerUserOption.name : ''} />
}

const HeaderContainer = styled.div`
  display: inline-flex;
`

const SuccessIconImg = styled.img`
  padding: 0 5px 0 0;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const List = styled.dl`
  display: flex;
  padding: 50px 0 0 0;
  justify-content: center;
  gap: 30px;
`

const TitleWrapper = styled.dt`
  ${typeShared}
  font-weight: 500 !important;
  font-size: 16px;
  color: ${props => props.theme.p};
  margin: 6px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  text-align: left;
`
const Title: React.FC<{ className?: string; }> = ({ children, className }) => (
  <TitleWrapper className={className ? `${LIST_TITLE} ${className}` : LIST_TITLE}>
    {children}
  </TitleWrapper>
)

const DescriptionWrapper = styled.dd`
  ${typeShared}
  font-weight: 400 !important;
  font-size: 16px;
  color: ${props => props.theme.secondaryText};
  margin: 6px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  text-align: left;
`
const Description: React.FC<{ className?: string; }> = ({ children, className }) => (
  <DescriptionWrapper className={className ? `${LIST_DESCRIPTION} ${className}` : LIST_DESCRIPTION}>
    {children}
  </DescriptionWrapper>
)

const NetworkWrapper = styled.span`
  ${typeShared}
  font-weight: 400 !important;
  font-size: 16px;
  color: ${props => props.theme.secondaryText};
  margin: 6px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  text-align: left;
  position: relative;
  padding-left: 14px;

  &:after {
    position: absolute;
    top: 9;
    left: 5;
    -webkit-transform: translate(-5px,-50%);
    transform: translate(-5px,-50%);
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #40d512;
  }
`

const Network: React.FC<{ className?: string; title?: string }> = ({ children, className, title }) => (
  <NetworkWrapper className={className ? `${LIST_NETWORK} ${className}` : LIST_NETWORK} title={title}>
    {children}
  </NetworkWrapper>
)

const Disclaimer = styled.dt`
  ${typeShared}
  font-weight: 500 !important;
  font-size: 16px;
  color: ${props => props.theme.p};
  margin: 6px 0;
  padding: 5px  0 15px 0;
  overflow: hidden;
  max-width: 300px;
  text-align: center;
`

const ClickableWrapper = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const Clickable: React.FC<{ className?: string; onClick: () => void }> = ({ children, className, onClick }) => (
  <ClickableWrapper className={className ? `${LIST_CLICKABLE} ${className}` : LIST_CLICKABLE} onClick={onClick}>
    {children}
  </ClickableWrapper>
)

const PaddedClickableWrapper = styled.span`
  padding: 0 0 0 15px;
  &:hover {
    cursor: pointer;
  }
`

const PaddedClickable: React.FC<{ className?: string; onClick: () => void }> = ({ children, className, onClick }) => (
  <PaddedClickableWrapper className={className ? `${LIST_CLICKABLE} ${className}` : LIST_CLICKABLE} onClick={onClick}>
    {children}
  </PaddedClickableWrapper>
)

const CenterContent = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`

const LogoWrapper = styled.div`
  margin-top: 30px;
  width: 85px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`

export function shortAddress (address?: string): string {
  if (!address) return ''

  return `${address.substr(0, 6)}...${address.substr(
    address.length - 4,
    address.length
  )}`
}
