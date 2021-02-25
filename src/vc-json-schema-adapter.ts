import { decodeJWT } from 'did-jwt'
import { parseVerifiableCredential } from '@rsksmart/vc-json-schemas-parser'

// Use this function to add new Verifiable Credential Schema rendering
// We need to improve the errors thrown at this stage. We could display
// the credential ID with a link to the Id Manager
export function credentialToText (schema: string, jwt: string) {
  try {
    const jwtDecoded = decodeJWT(jwt)

    try {
      const parsedEmailVC = parseVerifiableCredential('Email', jwtDecoded.payload.vc)
      return `${parsedEmailVC.Email.prefix.en}: ${parsedEmailVC.Email.text}`
    } catch (e) {
      return 'Invalid credential schema...'
    }
  } catch (e) {
    return 'Invalid credential...'
  }
}
