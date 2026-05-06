import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const CardBase = styled.div`
  background: ${token("colors.secondaryBackground")};
  border: 1px solid ${token("colors.darkGray")};
  border-radius: 12px;
  padding: 18px;
  transition: all 200ms ease;
  cursor: default;
  width: 100%;
  text-align: left;
`

export const ClickableCardBase = styled.button`
  background: ${token("colors.secondaryBackground")};
  border: 1px solid ${token("colors.darkGray")};
  border-radius: 12px;
  padding: 18px;
  transition: all 200ms ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: ${token("colors.primary")};
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.15);
  }

  &:focus-visible {
    outline: 2px solid ${token("colors.primary")};
    outline-offset: 3px;
  }
`

export const CardHeaderBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
  min-width: 0;

  & > *:first-child {
    flex: 1;
    min-width: 0;
  }
`

export const CardTitleBase = styled.h3`
  margin: 0;
  color: ${token("colors.primary")};
  font-size: 17px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const BadgeContainerBase = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const BadgeBase = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const StatusBadgeBase = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 500;

  &[data-active="true"] {
    background: #dcfce7;
    color: #166534;
  }

  &[data-active="false"] {
    background: #fee2e2;
    color: #991b1b;
  }
`

export const CardInfoBase = styled.span`
  color: ${token("colors.darkGray")};
  font-size: 13px;
`
