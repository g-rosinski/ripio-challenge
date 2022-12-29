import { render, screen } from "@testing-library/react";
import React, { ComponentProps } from "react";
import AutocompleteField from "./AutocompleteField.component";

describe('<AutocompleteField />', () => {

    const onChange = jest.fn()
    const onQuery = jest.fn()
    const onSelectOption = jest.fn()
    const baseProps: ComponentProps<typeof AutocompleteField> = {
        label: 'Usuarios',
        name: 'users',
        value: '',
        options: [],
        onChange,
        onQuery,
        onSelectOption
    }

    test('Renderice correctamente', () => {
        const { container } = render(<AutocompleteField {...baseProps} />)

        expect(container).toMatchSnapshot()
        expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
})