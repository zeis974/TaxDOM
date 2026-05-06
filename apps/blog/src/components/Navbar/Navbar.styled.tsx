import { styled } from "@/panda/jsx"

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 30px;
  height: 95px;
  background: token(colors.background);

  & > div:first-of-type {
    display: flex;
    position: relative;

    & > a {
      color: token(colors.primary);
      font-size: clamp(1.8em, 5vw, 2em);    
      font-family: "Rowdies", serif;
      position: relative;

      &::before {
        content: "-Alpha";
        bottom: -10px;
        right: 0;
        font-size: 0.5em;
        position: absolute;
        color: gray;
      }  
    }
  }

  & > div:last-of-type {
    display: flex;
    align-items: center;
    gap: 30px;
  }
`

export const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: Arial, sans-serif;

  & input[type="checkbox"] {
    position: relative;
    width: 50px;
    height: 25px;
    -webkit-appearance: none;
    appearance: none;
    background: #ccc;
    outline: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:checked {
      background: #4caf50;

      &::before {
        transform: translateX(25px);
      }
    }

    &::before {
      content: "";
      position: absolute;
      width: 21px;
      height: 21px;
      top: 2px;
      left: 2px;
      background: white;
      border-radius: 50%;
      transition: transform 0.3s ease;
    }
  }
`
