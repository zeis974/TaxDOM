import { styled } from "@/panda/jsx"

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  position: relative;

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }

  &[data-active="true"] {
    background: token(colors.primary);
    color: token(colors.background);
    border-color: token(colors.primary);

    &:hover {
      background: token(colors.primary);
      opacity: 0.9;
    }
  }
`

export const FilterIcon = styled.svg`
  width: 16px;
  height: 16px;
  transition: transform 150ms ease;

  &[data-open="true"] {
    transform: rotate(180deg);
  }
`

export const FilterBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid token(colors.background);
`

export const FilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
  padding: 16px;
  min-width: 280px;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 200ms ease;

  &[data-open="true"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

export const FilterSection = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const FilterLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: token(colors.primary);
  margin-bottom: 8px;
  font-family: token(fonts.nativeFont);
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const FilterOption = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid token(colors.darkGray);
  border-radius: 6px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 13px;
  cursor: pointer;
  transition: all 150ms ease;
  text-align: left;

  &:hover {
    background: token(colors.tertiaryBackground);
    border-color: token(colors.primary);
  }

  &[data-selected="true"] {
    background: token(colors.primary);
    color: token(colors.background);
    border-color: token(colors.primary);
  }
`

export const FilterActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid token(colors.darkGray);
  margin-top: 16px;
`

export const FilterActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  font-family: token(fonts.nativeFont);
  cursor: pointer;
  transition: all 150ms ease;

  &[data-variant="primary"] {
    background: token(colors.primary);
    color: token(colors.background);

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &[data-variant="secondary"] {
    background: token(colors.tertiaryBackground);
    color: token(colors.primary);
    border: 1px solid token(colors.darkGray);

    &:hover {
      background: token(colors.secondaryBackground);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export const FilterCounter = styled.span`
  font-size: 12px;
  color: token(colors.darkGray);
  font-weight: normal;
`

export const CheckIcon = styled.svg`
  width: 14px;
  height: 14px;
  opacity: 0;
  transition: opacity 150ms ease;

  [data-selected="true"] & {
    opacity: 1;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 6px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  transition: all 150ms ease;

  &::placeholder {
    color: token(colors.darkGray);
  }

  &:focus {
    outline: none;
    border-color: token(colors.primary);
    background: token(colors.secondaryBackground);
  }

  &:hover {
    border-color: token(colors.primary);
  }
`

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px 12px;
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 6px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  appearance: none;
  /* background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); */
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;

  &:focus {
    outline: none;
    border-color: token(colors.primary);
    background-color: token(colors.secondaryBackground);
  }

  &:hover {
    border-color: token(colors.primary);
  }

  option {
    background: token(colors.background);
    color: token(colors.primary);
  }
`
