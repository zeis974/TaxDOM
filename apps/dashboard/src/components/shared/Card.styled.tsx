import { styled } from "@/panda/jsx"

export const Card = styled.div`
  background: token(colors.surface);
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  padding: 14px;
  transition: all 200ms ease;
  cursor: default;
  width: 100%;
  text-align: left;
`

export const ClickableCard = styled.button`
  background: token(colors.surface);
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  padding: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: token(colors.foreground);
    box-shadow: 0 8px 20px token(colors.shadow);
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
  font-size: token(fontSizes.label-md);
  padding: 4px 10px;
  border-radius: token(radii.full);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  &[data-type="accent"],
  &[data-type="category"] {
    background: #f3e8ff;
    color: #7c3aed;
  }

  &[data-type="info"],
  &[data-type="eu"] {
    background: #e0f2fe;
    color: #0284c7;
  }

  &[data-type="neutral"],
  &[data-type="products"] {
    background: token(colors.surface);
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
    background: token(colors.success);
    color: #166534;
  }

  &[data-active="false"] {
    background: token(colors.error);
    color: token(colors.error);
  }
`
