// @ts-ignore
import trustWalletLogo from '../../providers/logos/trust-wallet.svg'
// @ts-ignore
import defiantLogo from '../../providers/logos/defiant.png'

interface PeerMeta {
    description?: string | undefined | null,
    icons?: string[] | undefined | null,
    name?: string | undefined | null,
    url?: string | undefined | null
}

interface PeerInfo {
    name: string,
    logo: string
}

// WARNING: For this wallets we are relying in the metaName which is set by each wallet.
// SOLUTION: Each wallet has to put their right name and the first icon must be a valid logo (url or base64).
const supportedWallets = [
  {
    metaName: 'Trust Wallet',
    name: 'Trust Wallet',
    logo: trustWalletLogo
  },
  {
    metaName: 'Flutter Client',
    name: 'Defiant',
    logo: defiantLogo
  }
]

export function getPeerInfo (meta: PeerMeta | undefined | null): PeerInfo | null {
  if (!meta) { return null }
  if (!meta.name) { return null }

  if (meta.icons && Array.isArray(meta.icons) && meta.icons.length > 0 && meta.icons[0].length > 0) {
    return {
      name: meta.name,
      logo: meta.icons[0]
    }
  }

  const result = supportedWallets.find(x => meta!.name!.toLowerCase().includes(x.metaName.toLowerCase()))

  if (result) {
    return {
      name: result.name,
      logo: result.logo
    }
  }

  return null
}
