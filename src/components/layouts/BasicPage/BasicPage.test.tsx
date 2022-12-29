import { render } from '@testing-library/react'
import React from 'react'
import BasicPage from './BasicPage.component'

describe('<BasicPage/>', () => {

    it('Se espera que se reenderice correctamente', () => {
        const {container} = render(<BasicPage><></></BasicPage>)

        expect(container).toMatchSnapshot()
    })

})