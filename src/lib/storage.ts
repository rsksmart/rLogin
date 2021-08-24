const PREFIX = 'RLogin'

export class RLoginStorage {
  getItem (key:string):string|null {
    return localStorage.getItem(`${PREFIX}:${key}`)
  }

  setItem (key:string, value:string) {
    return localStorage.setItem(key, value)
  }
}
