import styled from 'styled-components'

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 0.875rem;
  gap: 0.5rem;
  min-width: 120px;
  min-height: 40px;

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.variant === 'solid' && `
    background-color: ${props.theme.colors.primary};
    border-color: ${props.theme.colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background-color: transparent;
      color: ${props.theme.colors.primary};
    }
  `}

  ${props => props.variant === 'outline' && `
    background-color: transparent;
    border-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.primary};
      color: white;
    }
  `}

  ${props => props.variant === 'ghost' && `
    background-color: transparent;
    border-color: transparent;
    color: ${props.theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.border};
    }
  `}
`