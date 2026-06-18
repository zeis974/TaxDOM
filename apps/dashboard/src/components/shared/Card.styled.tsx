import { styled } from "@/panda/jsx"

export const Card = styled.div`
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.border);
  border-radius: 12px;
  padding: 14px;
  transition: all 200ms ease;
  cursor: default;
  width: 100%;
  text-align: left;
`

export const ClickableCard = styled.button`
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.border);
  border-radius: 12px;
  padding: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: token(colors.primary);
    box-shadow: 0 8px 20px token(colors.shadow);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 3px;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 16px;
  min-width: 0;

  & > *:first-child {
    flex: 1;
    min-width: 0;
  }
`

export const CardTitle = styled.h3`
  margin: 0;
  color: token(colors.primary);
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CardInfo = styled.span`
  color: token(colors.border);
  font-size: 13px;
`

export const BadgeContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

/**
 * Badge décoratif coloré. Variantes via data-type.
 */
export const Badge = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  &[data-type="accent"],
  &[data-type="category"] {
    background: token(colors.accent);
    color: token(colors.accentFg);
  }

  &[data-type="info"],
  &[data-type="eu"] {
    background: token(colors.info);
    color: token(colors.infoFg);
  }

  &[data-type="neutral"],
  &[data-type="products"] {
    background: token(colors.tertiaryBackground);
    color: token(colors.primary);
  }
`

/**
 * Badge de statut actif/inactif. Encodage unique : data-active (booléen).
 */
export const StatusBadgeStyled = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;

  &[data-active="true"] {
    background: token(colors.success);
    color: token(colors.successFg);
  }

  &[data-active="false"] {
    background: token(colors.danger);
    color: token(colors.dangerFg);
  }
`
