import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import { notificationType } from '../reducers/notificationReducer.js'
import Notification from './Notification.js'

describe('Notification component', () => {

  const testReducer= combineReducers({
    notification: (state, action) => {
      return {
        type: notificationType.INFO,
        message: 'test notification'
      }
    }
  })

  const testStore = createStore(testReducer, applyMiddleware(thunk))

  test('renders component', () => {

    const component = render(<Provider store={testStore}>
                               <Router>
                                 <Notification />
                               </Router>
                             </Provider>)
    const elem = component.container
    console.log(prettyDOM(elem))
    expect(elem.textContent).toBe('test notification')
  })

})
