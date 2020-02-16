/* setupTests.js
 *
 * Initializing Test Environment, from create-react-app
 * https://github.com/facebook/create-react-app/blob/ed5c48c81b2139b4414810e1efe917e04c96ee8d/packages/react-scripts/template/README.md#initializing-test-environment
 *
 *    If your app uses a browser API that you need to mock in your tests or if you
 *    just need a global setup before running your tests, add a src/setupTests.js
 *    to your project. It will be automatically executed before running your
 *    tests.
 *
 */

/* ------------------------------------------------------------------ *
 * Simulate browser's window.localStorage for user authentication
 * ------------------------------------------------------------------ */
let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
/* ------------------------------------------------------------------ */