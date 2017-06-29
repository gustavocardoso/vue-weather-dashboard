import { mount } from 'avoriaz'
import { expect } from 'chai'

import store from '../src/store/store'

import App from '../src/App.vue'

import WdHeader from '../src/components/structure/Header'
import WdFooter from '../src/components/structure/Footer'
import WdGeolocation from '../src/components/geolocation/Geolocation'
import WdWeather from '../src/components/weather/Weather'

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      store
    })
  });

  it('should has and element with id "App"', () => {
    expect(wrapper.is('#app')).to.equal(true)
  });

  it('should render a WdHeader element', () => {
    expect(wrapper.contains(WdHeader)).to.equal(true)
  });

  it('should render a WdFooter element', () => {
    expect(wrapper.contains(WdFooter)).to.equal(true)
  });

  it('should render a WdGeolocation element', () => {
    expect(wrapper.contains(WdGeolocation)).to.equal(true)
  });

  it('should not render a WdWeather element', () => {
    expect(wrapper.contains(WdWeather)).to.equal(false)
  });
});
