import { mount } from 'avoriaz'
import { expect } from 'chai'

import mutations from '../src/store/mutations'

const { UPDATE_LOCATION, UPDATE_LOCATION_INFO } = mutations

describe('Mutations', () => {
  it('should UPDATE_LOCATION', () => {
    const state = {
      latitude: '',
      longitude: '',
      currentPosition: '',
      locationKey: ''
    }

    const payload = {
      latitude: -23.565365,
      longitude: -46.7020613,
      currentPosition: '-23.565365,-46.7020613',
      locationKey: '2658064'
    }

    UPDATE_LOCATION(state, payload)

    expect(state.location).to.eql(payload)
  });

  it('should UPDATE_LOCATION_INFO', () => {
    const state = {
      city: '',
      neighborhood: '',
      admArea: '',
      country: ''
    }

    const payload = {
      city: 'São Paulo',
      neighborhood: 'Perdizes',
      admArea: 'SP',
      country: 'Brasil'
    }

    UPDATE_LOCATION_INFO(state, payload)

    expect(state.locationInfo).to.eql(payload)
  });
});