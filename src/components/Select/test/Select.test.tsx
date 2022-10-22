import Select, { Option } from '@/components/Select'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Select Option', () => {
  it('should render correctly', async () => {
    render(
      <Select data-testid="select" label="Select Label">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>,
    )

    expect(screen.getByTestId('select')).toBeInTheDocument()
    expect(screen.getByTestId('select-label').textContent).toEqual(
      'Select Label',
    )
    expect(screen.queryByTestId('select-error-message')).not.toBeInTheDocument()

    await fireEvent.change(screen.getByTestId('select'), {
      target: { value: '2' },
    })
    let options = screen.getAllByTestId('select-option')

    expect((options[0] as HTMLOptionElement).selected).toBeFalsy()
    expect((options[1] as HTMLOptionElement).selected).toBeTruthy()
  })

  it('should render correctly, with error message', async () => {
    render(
      <Select data-testid="select" errorMessage="Error">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>,
    )

    expect(screen.getByTestId('select-error-message').textContent).toEqual(
      'Error',
    )
  })
})
