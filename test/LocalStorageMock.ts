interface IStore {
    [key: string]: any
  }

class LocalStorageMock {
    private store: IStore

    constructor () {
      this.store = {}

      this.getItem.bind(this)
      this.setItem.bind(this)
      this.clear.bind(this)
      this.removeItem.bind(this)
    }

    clear () {
      this.store = {}
    }

    getItem (key: string) {
      return this.store[key] || null
    }

    setItem (key: string, value: any) {
      this.store[key] = String(value)
    }

    removeItem (key: string) {
      delete this.store[key]
    }
};

export default LocalStorageMock
