import { mount } from 'avoriaz'
import { expect } from 'chai'
import _ from 'lodash'

import store from '../src/store/store'

describe('State', () => {
  let initialState

  beforeEach(() => {
    initialState = _.cloneDeep(store.state)
  })

  context('initial state', () => {
    it('should have the "location" and "locationInfo" path', () => {
      expect(_.has(initialState, 'location') && _.has(initialState, 'locationInfo')).to.equal(true)
    })
  })

  context('location object', () => {
    it('should have all keys with empty values', () => {
      const { location } = initialState
      
      expect(location.latitude).to.equal('')
      expect(location.longitude).to.equal('')
      expect(location.currentPosition).to.equal('')
      expect(location.locationKey).to.equal('')
    })
  })

  context('locationInfo object', () => {
    it('should have all keys with empty values', () => {
      const { locationInfo } = initialState
      
      expect(locationInfo.city).to.equal('')
      expect(locationInfo.neighborhood).to.equal('')
      expect(locationInfo.admArea).to.equal('')
      expect(locationInfo.country).to.equal('')
    })
  })
})

