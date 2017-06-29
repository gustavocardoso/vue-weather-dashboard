import { mount } from 'avoriaz'
import { expect } from 'chai'

import Header from '../src/components/structure/Header'
import WdLogo from '../src/components/structure/Logo'

describe('Header component', function () {
  let wrapper
  
  beforeEach(() => {
    wrapper = mount(Header)
  });

  it('should has header as root element', () => {
    expect(wrapper.is('header')).to.equal(true)
  });

  it('should has a root element with class "footer"', () => {
    expect(wrapper.hasClass('main-header')).to.equal(true)
  });

  it('should has WdLogo', () => {
    expect(wrapper.contains(WdLogo)).to.equal(true)
  });
});
