import { decodeJWT } from 'did-jwt'

// Use this function to add new Verifiable Credential Schema rendering
// We need to improve the errors thrown at this stage. We could display
// the credential ID with a link to the Id Manager
export function credentialToText (schema: string, jwt: string) {
  try {
    const jwtDecoded = decodeJWT(jwt)
    try {
      const credentialSubject = jwtDecoded.payload.vc.credentialSubject
      switch (schema) {
        case 'Email': return `Email address: ${credentialSubject.emailAddress}`
        default: return JSON.stringify(credentialSubject)
      }
    } catch (e) {
      return 'Invalid credential schema...'
    }
  } catch (e) {
    return 'Invalid credential...'
  }
}
