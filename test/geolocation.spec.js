import { mount } from 'avoriaz'
import { expect } from 'chai'

import store from '../src/store/store'
import mutations from '../src/store/mutations'

import CcMap from '../src/components/geolocation/Map'
import CcLocationInfo from '../src/components/geolocation/LocationInfo'
import Geolocation from '../src/components/geolocation/Geolocation'

describe('Geolocation component', () => {
  let wrapper
  let wrapperMap
  let wrapperLocationInfo

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
        wrapperMap,
        wrapperLocationInfo
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
    it('should not have a "locationinfo" element if showPosition equals false', () => {
      wrapper.setData({ showPosition: false })
      const locInfo = wrapper.find('.locationinfo')[0]
      expect(wrapper.contains('.locationinfo')).to.equal(false)
    })

    it('should have a "locationinfo" element if showPosition equals true', () => {
      wrapper.setData({ showPosition: true })
      const locInfo = wrapper.find('.locationinfo')[0]
      expect(wrapper.contains('.locationinfo')).to.equal(true)
    })

    it('should display a "locationinfo" element with complete infos when props are passed to it', () => {
      wrapperLocationInfo = mount(CcLocationInfo, {
        propsData: {
          location: 'Perdizes - São Paulo / SP',
          country: 'Brazil'
        }
      })

      wrapper.setData({ showPosition: true })

      //console.log(wrapper.contains('.locationinfo'))
      //expect(wrapperLocationInfo.contains('.locationinfo')).to.equal(true)
      const locationInfo = wrapperLocationInfo.find('span')[0].text()
      const locationInfoCountry = wrapperLocationInfo.find('span')[1].text()
      
      expect(locationInfo).to.equal('Perdizes - São Paulo / SP')
      expect(locationInfoCountry).to.equal('Brazil')
    })
  })
})