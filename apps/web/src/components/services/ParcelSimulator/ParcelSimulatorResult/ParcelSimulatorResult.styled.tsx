import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  background: token(colors.secondaryBackground);
  color: white;
  position: absolute;
  z-index: 2;
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  & hr {
    margin: 0 20px;
  }
`

export const ProductsContainer = styled.div`
  position: relative;
  grid-area: 2 / 1 / 3 / 2;
  background: token(colors.background);
  color: token(colors.primary);
  border-radius: 10px;
  overflow-y: auto;

  & > div:first-of-type {
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    justify-content: space-between;
    align-items: center;
    background: token(colors.background);
    color: token(colors.primary);
    position: sticky;
    top: 0;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 10px;
      background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, token(colors.background) 100%);
      top: 100%;
    }

    & span:last-child {
      margin: 0 10px;
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`

export const ProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  background: token(colors.darkGray);
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid black;
`

export const TaxesContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: token(colors.primary);
`

export const TaxesInfo = styled.div`
  background: token(colors.background);
  border-radius: 10px;
  padding: 10px;

  & > div {
    display: flex;
    margin: 20px 0;
    justify-content: space-around;

    & div {
      display: inherit;
      flex-direction: column;
      p {
        span {
          font: bold 1.5em token(fonts.NotoSansBold);
          color: #2a7bb1;
          margin-right: 5px;
        }
      }
    }
  }
`

export const DutyInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  & span {
    margin-bottom: 10px;
    color: token(colors.primary);

    & span {
      color: #2a7bb1;
      font: bold 1.5em token(fonts.NotoSansBold);
    }
  }

  & p {
    position: relative;
    font-size: 0.8em;
    text-align: justify;
    margin-left: 10px;
    
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      left: -10px;
      background: token(colors.darkGray);
    }
  }
`

export const Informations = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  background: token(colors.background);
  border-radius: 10px;
  overflow-y: auto;
`

export const TaxesInformations = styled.div`
  padding: 10px;

  &[data-taxes="false"] h1 {
    color: green;
  }

  h1 {
    color: red;
  }

  hr {
    margin: 15px 0;
  }

  h3 {
    margin-bottom: 15px;

    & ~ div {
      position: relative;
      display: flex;
      flex-direction: column;

      &::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 2px;
        background: token(colors.darkGray);
      }

      & p {
        position: relative;
        font-size: 1em;
        /* text-align: justify;  */
        margin-left: 10px;

        & span {
          color: #2a7bb1;
          font: bold 1em token(fonts.NotoSansBold);
        }
      }
    }
  }
`
