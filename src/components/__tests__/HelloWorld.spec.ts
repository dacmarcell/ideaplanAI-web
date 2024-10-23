import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MarkdownRenderer from '../MarkdownRenderer.vue'

describe('MarkdownRenderer', () => {
  it('renders properly', () => {
    const wrapper = mount(MarkdownRenderer)
    expect(wrapper.element()).toContain('input')
    expect(wrapper.element()).toContain('button')
  })
})
