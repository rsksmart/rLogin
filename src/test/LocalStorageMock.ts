// reference:git status https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

const localStorageMock = (() => {
  let store: any = {}
  return {
    getItem: (key: string) => {
      return store[key]
    },
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    length: Object.keys(store).length,
    key: (index: number) => 'notImplemented'
  }
})()

export default localStorageMock
