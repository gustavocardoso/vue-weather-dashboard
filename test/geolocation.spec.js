import { mount } from 'avoriaz'
import { expect } from 'chai'

import store from '../src/store/store'

import CcMap from '../src/components/geolocation/Map'
import Geolocation from '../src/components/geolocation/Geolocation'

describe('Geolocation component', () => {
  let wrapper
  let wrapperMap

  beforeEach(() => {
    wrapperMap = mount(CcMap, {
      propsData: {
        latitude: '-23.565365',
        longitude: '-46.7020613'
      }
    })
    
    wrapper = mount(Geolocation, {
      store,
      data: {
        showMap: false
      },
      components: {
        wrapperMap
      }
    })
  })

  it('should has a "geolocation-box" as root element', () => {
    expect(wrapper.is('.geolocation-box')).to.equal(true)
  })

  context('Map', () => {
    it('should not render a "CcMap" element when showMap is false', () => {
      expect(wrapper.contains(CcMap)).to.equal(false)
    })

    it('should render a "CcMap" element when showMap is true', () => {
      wrapper.setData({ showMap: true })
      expect(wrapper.contains(CcMap)).to.equal(true)
    })
  })

  context('Location Info', () => {
    it('should have a "locationinfo" element', () => {
      const locInfo = wrapper.find('.locationinfo')[0]
      expect(wrapper.contains('.locationinfo')).to.equal(true)
    })
  })
})