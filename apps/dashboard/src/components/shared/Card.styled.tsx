import { styled } from "@/panda/jsx"

export const Card = styled.div`
  background: token(colors.elevated);
  border: none;
  border-radius: token(radii.lg);
  padding: 14px;
  transition: all 200ms ease;
  cursor: default;
  width: 100%;
  text-align: left;
`

export const ClickableCard = styled.button`
  background: token(colors.elevated);
  border: 1px solid transparent;
  border-radius: token(radii.lg);
  padding: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: token(colors.border);
  }

  &:focus-visible {
    outline: 2px solid token(colors.foreground);
    outline-offset: 3px;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: token(spacing.md);
  min-width: 0;

  & > *:first-child {
    flex: 1;
    min-width: 0;
  }
`

export const CardTitle = styled.h3`
  margin: 0;
  color: token(colors.foreground);
  font-size: token(fontSizes.body-md);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CardInfo = styled.span`
  color: token(colors.textMuted);
  font-size: token(fontSizes.label-md);
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
  font-size: token(fontSizes.label-md);
  padding: 4px 10px;
  border-radius: token(radii.full);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  &[data-type="accent"],
  &[data-type="category"],
  &[data-type="info"],
  &[data-type="eu"] {
    background: color-mix(in srgb, token(colors.primary) 12%, transparent);
    color: token(colors.primaryHover);
  }

  &[data-type="neutral"],
  &[data-type="products"] {
    background: token(colors.elevated);
    color: token(colors.foreground);
  }
`

/**
 * Badge de statut actif/inactif. Encodage unique : data-active (booléen).
 */
export const StatusBadgeStyled = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: token(radii.full);
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  letter-spacing: 0.02em;

  &[data-active="true"] {
    background: token(colors.successBg);
    color: token(colors.successFg);
  }

  &[data-active="false"] {
    background: token(colors.errorBg);
    color: token(colors.errorFg);
  }
`
