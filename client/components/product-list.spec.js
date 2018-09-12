/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductList} from './product-list'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductList', () => {
  let productList

  beforeEach(() => {
    productList = shallow(<ProductList title="Apple" />)
  })

  it('renders the title in an h3', () => {
    expect(ProductList.find('h3').text()).to.be.equal('Apple')
  })
})
