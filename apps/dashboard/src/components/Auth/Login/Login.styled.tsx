import { styled } from "@/panda/jsx"

export const Layout = styled.div`
  display: flex;
  min-height: 100dvh;
  flex-direction: row;
`

export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 50%;
`

export const RightPanel = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
  background: #3498db;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
`

export const LogoCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: token(colors.darkGray);
  border: 4px solid;
  border-color: token(colors.lightGray);
`

export const BrandName = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: token(colors.darkGray);
  font-family: token(fonts.heading);
  letter-spacing: tight;
`

export const MainContent = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 380px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: token(colors.darkGray);
  letter-spacing: tight;
  line-height: 1.2;
`

export const Subtitle = styled.p`
  font-size: 1rem;
  color: token(colors.gray);
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: white;
  border: 1px solid;
  border-color: token(colors.lightGray);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: token(colors.darkGray);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: token(colors.secondaryBackground);
    border-color: token(colors.gray);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    background-color: token(colors.lightGray);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid;
    outline-color: token(colors.primary);
    outline-offset: 2px;
  }
`

export const Icon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
`

// export const DividerContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   margin-top: 1rem;
// `

// export const DividerLine = styled.div`
//   flex: 1;
//   height: 1px;
//   background-color: token(colors.lightGray);
// `

// export const DividerText = styled.span`
//   font-size: 0.75rem;
//   font-weight: 500;
//   color: token(colors.gray);
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// `

// export const InfoText = styled.p`
//   font-size: 0.875rem;
//   color: token(colors.gray);
//   text-align: center;
//   line-height: 1.5;
// `
export const FooterLink = styled.a`
  color: token(colors.primary);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const PatternOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
  background-size: 24px 24px;
`

export const RightContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 480px;
  text-align: left;
`

export const RightTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.3;
`

export const RightSubtitle = styled.p`
  font-size: 1.125rem;
  /* color: token(colors.gray); */
  line-height: 1.6;
`
