import { mount } from 'avoriaz'
import chai, { expect } from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moxios from 'moxios'
import store from '../src/store/store'
import mutations from '../src/store/mutations'

const { UPDATE_LOCATION, UPDATE_LOCATION_INFO } = mutations

import Weather from '../src/components/weather/Weather'

describe('Weather component', () => {
  let wrapper
  let sandbox

  beforeEach(() => {
    moxios.install()

    const state = {
      latitude: '',
      longitude: '',
      currentPosition: '',
      locationKey: ''
    }

    const payload = {
      latitude: '-23.565365',
      longitude: '-46.7020613',
      currentPosition: '-23.565365,-46.7020613',
      locationKey: '2658064'
    }

    UPDATE_LOCATION(store.state, payload)

    wrapper = mount(Weather, {
      store
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should has a "weather-box" as root element', () => {
    expect(wrapper.is('.weather-box')).to.equal(true)
  })

  it('should call the current conditions method', (done) => {
    const currentConditions = sinon.spy(wrapper.vm, 'getCurrentConditions')

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      
      request.respondWith({
        status: 200,
        response: { status: 'ok' }
      }).then(function (ar) {
        done()
      })
    })
    
    wrapper.vm.getCurrentConditions()
    
    expect(currentConditions).to.have.been.calledOnce
  })

  it('should return the current conditions data', (done) => {
    const currentConditions = sinon.spy(wrapper.vm, 'getCurrentConditions')
    wrapper.vm.getCurrentConditions()

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      
      request.respondWith({
        status: 200,
        response: [
          {
            "WeatherText": "Partly cloudy",
            "WeatherIcon": 35,
            "Temperature": {
              "Metric": {
                "Value": 12.8,
                "Unit": "C",
                "UnitType": 17
              }
            }
          }
        ]
      }).then(function (ar) {
        const weatherInfo = {
          temp: 12.8,
          weatherText: 'partly cloudy',
          icon: `https://developer.accuweather.com/sites/default/files/35-s.png`
        }

        expect(wrapper.data().weather).to.be.eql(weatherInfo)
        done()
      })
    })
  })
})
