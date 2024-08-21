import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  background: #2980b9;
  padding: 25px 0 0 25px;
  border-radius: 10px;
`

export const Content = styled.div`
  color: black;
  text-align: left;
  margin-bottom: 25px;

  & span:first-child {
    font-family: token(fonts.Rowdies);
    font-size: clamp(14px, 1.5vw, 16px);
    color: white;
    padding: 5px;
    border-radius: 5px;
    background: #045a94;
  }

  & h1 {
    font-family: token(fonts.NotoSans);
    font-size: clamp(16px, 1.5vw, 24px);
    color: black;
    line-height: 1.2;
    margin: 20px 0;
    text-align: left;

    & span {
      font-family: token(fonts.NotoSansBold);
    }
  }

  & p {
    max-width: 250px;
  }
`

export const ActionBar = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
  margin-top: 25px;
    
  & div {
    width: 40px;
    height: 35px;
    display: inherit;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
    background: black;
    transition: background 150ms;

    &:hover {
      background: #045a94;
    }
  }
`
export const TaxeCard = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  color: black;
  z-index: 1;
  
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    border-radius: 10px;
    background: white;
    width: calc(100% + 35px);
    height: calc(100% + 35px);
    inset: 0;
  }

  @media screen and (width < 1250px) {
    width: 200px;
  }
`
export const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  & div {
    display: inherit;
    margin: 10px 0;
  }

  & h5 {  
    font-family: token(fonts.NotoSansBold);
    padding: 10px;
  }
`

export const Line = styled.hr`
  position: relative;
  border: 2px solid #2980B9;
`

export const RateCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black;
  flex: 1;

  & > span:first-of-type {
    font-size: 1.2em;
    color: #045a94;
    font-weight: bold;
  }

  & > span:last-of-type {
    font-size: 0.9em;
  }
`

export const PriceCalculator = styled.div` 
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px 10px 0;    
  color: black;

  &::before {
    content: "";
    position: absolute;
    width: 110px;
    height: 50px;
    background: no-repeat url("data:image/svg+xml,%3Csvg%20width%3D%22130%22%20height%3D%2238%22%20viewBox%3D%220%200%20130%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M130%200H0C0%200%2010.5012%2038%2029.1775%2038H130V0Z%22%20fill%3D%22%232980B9%22%2F%3E%3C%2Fsvg%3E");
    top: -2px;
    right: 0;
  }

  &::after {
    content: attr(data-total) "% total";
    position: absolute;
    font-weight: bold;
    top: 0;
    right: 0;   
    width: 100px;
    padding: 5px 0 5px 5px;
  }

  & h5 {
    font-family: token(fonts.NotoSansBold);
    text-align: left;
    margin-bottom: 10px;
  }
  
  & > div {
    display: inherit;
    margin-top: 10px;
  }
   
  & input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input[type=number] {
    max-width: 100px;
    background: none;
    color: black;
    outline: none;
    border: 2px solid #77b4dc;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    -moz-appearance: textfield;
  }
`

export const ErrorText = styled.span`
  position: absolute;
  width: 100%;
  font-size: 0.6em;
  padding: 10px;
  color: red;
  bottom: 0;
  right: 0;
  cursor: pointer;
`
