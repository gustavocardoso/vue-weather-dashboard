import { mount } from 'avoriaz'
import { expect } from 'chai'

import Footer from '../src/components/structure/Footer'

describe('Footer component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Footer)
  })

  it('should has footer as root element', () => {
    expect(wrapper.is('footer')).to.equal(true)
  })

  it('should has a paragraph with the class "developer"', () => {
    const paragraph = wrapper.find('.developer')
    
    expect(paragraph).to.have.lengthOf(1)
  })

  it('should has a paragraph with the class "repo"', () => {
    const paragraph = wrapper.find('.repo')

    expect(paragraph).to.have.lengthOf(1)
  })
})
