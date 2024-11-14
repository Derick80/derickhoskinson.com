import { describe, it, expect } from 'vitest'
import About from './page'

describe('About Page', () => {
    it('renders correctly', () => {
        expect(About).toBeDefined()
    })

    it('contains the correct heading', () => {
        const heading = About().props.children
        expect(heading).toContain('About Us')
    })
})
