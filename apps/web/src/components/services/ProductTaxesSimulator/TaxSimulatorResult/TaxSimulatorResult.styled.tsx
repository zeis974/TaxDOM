import { styled } from "@/panda/jsx"

export const ActionBar = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
  margin-top: 25px;

  div {
    width: 40px;
    height: 35px;
    display: inherit;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: token(radii.sm);
    cursor: pointer;
    background: token(colors.foreground);
    transition: background 150ms;
  }
`

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  background: token(colors.primary);
  padding: 25px 0 0 25px;
  border-radius: token(radii.lg);
`

export const Content = styled.div`
  color: token(colors.foreground);
  text-align: left;
  margin-bottom: 25px;

  & span:first-child {
    font-family: token(fonts.rowdies);
    font-size: clamp(14px, 1.5vw, 16px);
    color: token(colors.background);
    padding: 5px;
    border-radius: token(radii.sm);
    background: token(colors.primaryHover);
  }

  & h1 {
    font-family: token(fonts.nativeFont);
    font-size: clamp(16px, 1.5vw, 24px);
    color: token(colors.foreground);
    line-height: 1.2;
    margin: 20px 0;
    text-align: left;

    span {
      font-family: token(fonts.nativeFont);
    }
  }

  p {
    max-width: 250px;
  }
`

export const ErrorContainer = styled.div`
  p {
    max-width: 500px;
  }
`

export const ErrorText = styled.span`
  position: absolute;
  width: 100%;
  font-size: 0.6em;
  padding: 10px;
  color: token(colors.errorFg);
  bottom: 0;
  right: 0;
  cursor: pointer;
`

export const Line = styled.hr`
  position: relative;
  border: 2px solid token(colors.primaryHover);
`

export const PriceCalculator = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px 10px 0;
  color: token(colors.foreground);

  h5 {
    font-family: token(fonts.nativeFont);
    text-align: left;
  }

  & > div {
    display: inherit;
    margin-top: 10px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    max-width: 100px;
    background: none;
    color: token(colors.foreground);
    outline: none;
    border: 2px solid token(colors.primary);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    -moz-appearance: textfield;
  }
`

export const RateCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: token(colors.foreground);
  flex: 1;

  & > span:first-of-type {
    font-size: 1.2em;
    color: token(colors.primaryHover);
    font-weight: bold;
  }

  & > span:last-of-type {
    font-size: 0.9em;
  }
`

export const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  &::before {
    content: "";
    position: absolute;
    width: 110px;
    height: 50px;
    background: no-repeat
      url("data:image/svg+xml,%3Csvg%20width%3D%22130%22%20height%3D%2238%22%20viewBox%3D%220%200%20130%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M130%200H0C0%200%2010.5012%2038%2029.1775%2038H130V0Z%22%20fill%3D%22%232980B9%22%2F%3E%3C%2Fsvg%3E");
    top: -2px;
    right: 0;
  }

  &::after {
    content: attr(data-total) "% total";
    color: token(colors.background);
    position: absolute;
    font-weight: bold;
    top: 0;
    right: -9px;
    width: 100px;
    padding: 5px 0 5px 5px;
  }

  div {
    display: inherit;
    margin: 10px 0;
  }

  h5 {
    font-family: token(fonts.nativeFont);
    padding: 10px;
  }
`

export const ResetButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background: token(colors.background);
  border: 2px solid token(colors.primaryHover);
  border-radius: token(radii.sm);
  cursor: pointer;
  font-weight: bold;
  color: token(colors.primaryHover);
  transition: 150ms;

  &:hover {
    background: token(colors.primaryHover);
    color: token(colors.background);
  }
`

export const TaxeCard = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  color: token(colors.foreground);
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    border-radius: token(radii.lg);
    background: token(colors.background);
    width: calc(100% + 35px);
    height: calc(100% + 35px);
    inset: 0;
  }

  @media screen and (width < 1250px) {
    width: 200px;
  }
`
