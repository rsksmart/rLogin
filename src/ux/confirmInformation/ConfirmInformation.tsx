// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SD } from '../../lib/sdr'
import { Header2, SmallSpan, Span, Span2 } from '../../ui/shared/Typography'
import { Button, ButtonSecondary } from '../../ui/shared/Button'
import { credentialValueToText } from '../../vc-json-schema-adapter'
import Loading from '../../ui/shared/Loading'
import { Trans } from 'react-i18next'
import i18next from 'i18next'
import { getChainName } from '../../adapters'
import { IProviderUserOptions } from 'web3modal'
import Checkbox from '../../ui/shared/Checkbox'

const DONT_SHOW_AGAIN_KEY = 'RLogin:DontShowAgain'

interface ConfirmInformationProps {
  chainId: number | undefined
  address: string | undefined
  sd: SD | undefined
  providerUserOption: IProviderUserOptions
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmInformation ({ chainId, address, providerUserOption, sd, onConfirm, onCancel }: ConfirmInformationProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dontShowAgainSelected, setDontShowAgainSelected] = useState<boolean>(false)
  const data = sd ? Object.assign({}, sd.credentials, sd.claims) : {}

  const handleSubmit = () => {
    setIsLoading(true)
    onConfirm()
  }

  useEffect(() => {
    const DONT_SHOW_AGAIN_DEFAULT: boolean =
      localStorage.getItem(DONT_SHOW_AGAIN_KEY) ? JSON.parse(localStorage.getItem(DONT_SHOW_AGAIN_KEY)!) : false

    if (DONT_SHOW_AGAIN_DEFAULT) {
      handleSubmit()
    }
  }, [])

  return !isLoading
    ? <>
      <Header2><Trans>Information</Trans></Header2>
      <CenterContent>
        <ProviderLogo>
          <img src={providerUserOption.logo} alt={providerUserOption.name} />
        </ProviderLogo>
      </CenterContent>

      <div style={{ display: 'flex', padding: '50px 0', justifyContent: 'center', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Span><Trans>Wallet address</Trans>:</Span>
          <Span><Trans>Network</Trans>:</Span>
          {sd && Object.keys(sd.claims).map(key => <Span key={`claim-key-${key}`}>{key}:</Span>)}
          {sd && Object.keys(sd.credentials).map(key => <Span key={`credential-key-${key}`}>{key}:</Span>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Span2>{shortAddress(address)}</Span2>
          <Span2>{chainId && getChainName(chainId)}</Span2>
          {sd && Object.keys(sd.claims).map(key => <Span2 key={`claim-value-${key}`}>{data[key]}</Span2>)}
          {sd && Object.keys(sd.credentials).map(key => <Span2 key={`credential-value-${key}`}>{credentialValueToText(key, data[key])}</Span2>)}
        </div>
      </div>
      <CenterContent>
        <ButtonSecondary onClick={onCancel} disabled={isLoading}><Trans>Cancel</Trans></ButtonSecondary>
        <Button onClick={handleSubmit} disabled={isLoading}><Trans>Confirm</Trans></Button>
      </CenterContent>
      <CenterContent>
        <label style={{ marginTop: 20 }}>
          <Checkbox checked={dontShowAgainSelected} onChange={() => setDontShowAgainSelected(prev => {
            localStorage.setItem(DONT_SHOW_AGAIN_KEY, JSON.stringify(!prev))
            return !prev
          })} />
          <SmallSpan><Trans>Don’t show again</Trans></SmallSpan>
        </label>
      </CenterContent>
    </>
    : <Loading text={i18next.t('Confirming Identity')} size={10} />
}

const CenterContent = styled.div`
  display: flex; 
  gap: 16px;
  justify-content: center;
`

const ProviderLogo = styled.div`
  margin-top: 30px;
  width: 85px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
  }
`

function shortAddress (address?: string): string {
  if (!address) return ''

  return `${address.substr(0, 6)}...${address.substr(
    address.length - 4,
    address.length
  )}`
}
