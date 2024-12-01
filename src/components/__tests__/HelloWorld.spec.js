import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CountriesPage from '../../views/CountriesView.vue'

describe('Countries', () => {
  it('renders properly', () => {
    const wrapper = mount(CountriesPage, { props: { msg: 'Countries' } })
    expect(wrapper.text()).toContain('Countries')
  })
})
