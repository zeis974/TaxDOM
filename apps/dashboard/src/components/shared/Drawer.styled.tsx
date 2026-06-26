import { styled } from "@/panda/jsx"

/* ---------------------------------- Chrome --------------------------------- */

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: token(colors.overlay);
  backdrop-filter: blur(4px);
  z-index: 49;
`

export const DrawerContent = styled.div`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(460px, 100vw);
  height: 100vh;
  background: token(colors.bg);
  border-left: 1px solid token(colors.border);
  box-shadow: -32px 0 80px token(colors.shadow);
  display: flex;
  flex-direction: column;
  z-index: 50;
  font-family: token(fonts.nativeFont);
`

export const DrawerHeader = styled.header`
  padding: token(spacing.md);
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid token(colors.border);
`

export const DrawerHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);
`

export const DrawerHeaderActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

export const DrawerTitle = styled.h2`
  margin: 0;
  font-size: token(fontSizes.headline-lg);
  font-weight: 600;
  color: token(colors.foreground);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
`

export const DrawerMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: token(spacing.xs) token(spacing.md);
  margin-top: 8px;
  font-size: token(fontSizes.body-sm);
  color: token(colors.textMuted);
`

export const DrawerCloseButton = styled.button`
  background: token(colors.surface);
  color: token(colors.foreground);
  border: none;
  border-radius: token(radii.full);
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  transition: background 150ms ease;

  &:hover {
    background: token(colors.surface);
  }
`

export const HeaderActionButton = styled.button`
  background: transparent;
  color: token(colors.textMuted);
  border: none;
  border-radius: token(radii.md);
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms ease;

  &:hover {
    background: token(colors.surface);
    color: token(colors.foreground);
  }
`

/* ----------------------------- Top Bar (Rippling) -------------------------- */

export const DrawerTopBar = styled.header`
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid token(colors.border);
  flex-shrink: 0;
`

export const DrawerTopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DrawerTopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: token(spacing.sm);
`

export const DrawerTopBarLabel = styled.span`
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
`

export const DrawerNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: token(spacing.xs);
`

export const DrawerNavButton = styled.button`
  background: token(colors.surface);
  color: token(colors.textMuted);
  border: none;
  border-radius: token(radii.full);
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: token(fontSizes.body-sm);
  transition: background 150ms ease, color 150ms ease;

  &:hover:not(:disabled) {
    background: token(colors.surface);
    color: token(colors.foreground);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const DrawerNavCounter = styled.span`
  font-size: token(fontSizes.body-sm);
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
  min-width: 52px;
  text-align: center;
`

/* ----------------------------- Hero (Rippling) ----------------------------- */

export const DrawerHero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: token(spacing.lg);
  border-bottom: 1px solid token(colors.border);
  gap: token(spacing.md);
`

export const DrawerHeroTitle = styled.h2`
  margin: 0;
  font-size: token(fontSizes.headline-md);
  font-weight: 600;
  color: token(colors.foreground);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
  line-height: 1.25;
`

export const DrawerHeroActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
`

/* ----------------------------------- Body ---------------------------------- */

export const DrawerForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: token(spacing.md);
`

export const DrawerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: token(spacing.md);
`

export const DrawerSectionTitle = styled.h3`
  margin: 0;
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
`

export const DrawerSectionDescription = styled.p`
  margin: 0;
  font-size: token(fontSizes.body-sm);
  color: token(colors.textMuted);
  line-height: 1.6;
  font-family: token(fonts.nativeFont);
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: token(spacing.md);
`

export const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: token(spacing.md);

  & > span {
    font-size: token(fontSizes.body-sm);
    font-weight: 500;
    color: token(colors.foreground);
  }
`

export const Divider = styled.div`
  height: 1px;
  background: token(colors.border);
`

/* ---------------------------- Detail (read-only) --------------------------- */

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
`

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid token(colors.border);
  gap: token(spacing.md);

  &:last-child {
    border-bottom: none;
  }
`

export const DetailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: token(fontSizes.body-sm);
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
  min-width: 0;
  flex-shrink: 0;
`

export const DetailIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: token(colors.border);
  flex-shrink: 0;
`

export const DetailValue = styled.span`
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  text-align: right;
  min-width: 0;
  word-break: break-word;
`

export const DetailValueInput = styled.input`
  padding: 6px 10px;
  border: 1px solid token(colors.border);
  border-radius: 6px;
  font-size: token(fontSizes.body-sm);
  background: token(colors.surface);
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  max-width: 200px;
  width: 100%;
  text-align: right;

  &:focus {
    outline: none;
    border-color: token(colors.primary);
  }
`

export const DetailValueSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid token(colors.border);
  border-radius: 6px;
  font-size: token(fontSizes.body-sm);
  background: token(colors.surface);
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  max-width: 200px;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: token(colors.primary);
  }
`

export const DetailValueCopyable = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: token(colors.primary);
  }
`

export const StatusTagButton = styled.button`
  padding: 6px 14px;
  border-radius: token(radii.full);
  border: 1px solid token(colors.border);
  background: token(colors.surface);
  color: token(colors.foreground);
  font-size: token(fontSizes.label-md);
  font-weight: 500;
  cursor: pointer;
  font-family: token(fonts.nativeFont);

  &[data-active="true"] {
    background: token(colors.foreground);
    color: token(colors.bg);
    border-color: token(colors.foreground);
  }
`

/* ---------------------------------- Footer --------------------------------- */

export const DrawerFooter = styled.footer`
  padding: 16px 24px 24px;
  border-top: 1px solid token(colors.border);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: token(spacing.md);
`

export const ActionsGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`

export const ErrorContainer = styled.div`
  color: token(colors.error);
  flex: 1;
  font-family: token(fonts.nativeFont);
  min-width: 220px;

  & span {
    display: block;
    margin-bottom: 6px;
  }
`

export const DeleteButton = styled.button`
  background: token(colors.error);
  color: token(colors.error);
  border: none;
  border-radius: token(radii.md);
  padding: 10px 18px;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  font-weight: 600;

  &:hover:not(:disabled) {
    background: #fecaca;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const RulesEditorButton = styled.button`
  background: #e0f2fe;
  color: #0284c7;
  border: none;
  border-radius: token(radii.md);
  padding: 10px 18px;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  font-weight: 600;
  transition: filter 150ms ease;

  &:hover:not(:disabled) {
    filter: brightness(0.97);
  }
`

/* --------------------------------- Timeline -------------------------------- */

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const TimelineItem = styled.div`
  display: flex;
  gap: token(spacing.md);
  position: relative;
  padding-bottom: token(spacing.lg);

  &:last-child {
    padding-bottom: 0;
  }
`

export const TimelineIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`

export const TimelineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: token(radii.full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &[data-status="success"] {
    background: token(colors.success);
    color: #166534;
  }

  &[data-status="info"] {
    background: #e0f2fe;
    color: #0284c7;
  }

  &[data-status="warning"] {
    background: token(colors.warning);
    color: #d97706;
  }
`

export const TimelineConnector = styled.div`
  width: 2px;
  flex: 1;
  background: token(colors.border);
  margin-top: 8px;
  min-height: 16px;
`

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);
  padding-top: 4px;
  min-width: 0;
`

export const TimelineTitle = styled.span`
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
`

export const TimelineDescription = styled.span`
  font-size: token(fontSizes.body-sm);
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
  line-height: 1.5;
`

export const TimelineDate = styled.span`
  font-size: token(fontSizes.label-md);
  color: token(colors.border);
  font-family: token(fonts.nativeFont);
`

/* ========================= Detail Drawer (read-only hero) ===================== */

export const DetailDrawerHeader = styled.header`
  padding: 20px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid token(colors.border);
  flex-shrink: 0;
  gap: token(spacing.md);
`

export const DetailDrawerHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`

export const DetailDrawerHeaderTitle = styled.span`
  font-size: token(fontSizes.label-md);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: token(colors.textMuted);
  font-weight: 600;
  font-family: token(fonts.nativeFont);
`

export const DetailDrawerTitle = styled.h2`
  margin: 0;
  font-size: token(fontSizes.headline-md);
  font-weight: 600;
  color: token(colors.foreground);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
  line-height: 1.25;
`

export const DetailDrawerNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`

export const DetailDrawerNavButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: token(radii.full);
  border: 1px solid token(colors.border);
  background: token(colors.bg);
  color: token(colors.textMuted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover:not(:disabled) {
    border-color: token(colors.border);
    color: token(colors.foreground);
    background: token(colors.surface);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

export const DetailDrawerCounter = styled.span`
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
  min-width: 64px;
  text-align: center;
`

export const DetailDrawerHero = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 4px;
`

export const DetailDrawerHeroTitle = styled.h2`
  margin: 0;
  font-size: token(fontSizes.headline-md);
  font-weight: 600;
  color: token(colors.foreground);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
  line-height: 1.25;
`

export const DetailDrawerHeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: token(spacing.sm);
  flex-shrink: 0;
`

export const DetailDrawerIconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: token(radii.md);
  border: 1px solid token(colors.border);
  background: token(colors.bg);
  color: token(colors.textMuted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: token(colors.border);
    color: token(colors.foreground);
    background: token(colors.surface);
  }
`

export const DetailDrawerFooter = styled.footer`
  padding: 16px 24px 24px;
  border-top: 1px solid token(colors.border);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
`

export const DetailDrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

/* ----------------------------- Detail meta list ----------------------------- */

export const DetailMetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const DetailMetaRow = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid token(colors.border);

  &:last-child {
    border-bottom: none;
  }
`

export const DetailMetaLabel = styled.div`
  display: flex;
  align-items: center;
  gap: token(spacing.sm);
  font-size: token(fontSizes.body-sm);
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
`

export const DetailMetaIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: token(colors.border);
  flex-shrink: 0;
`

export const DetailMetaValue = styled.div`
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  display: flex;
  align-items: center;
  gap: token(spacing.sm);
  min-width: 0;
`

export const DetailMetaDescription = styled.p`
  margin: 0;
  font-size: token(fontSizes.body-sm);
  line-height: 1.5;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
`

export const DetailReadMore = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  color: token(colors.primary);
  cursor: pointer;
  font-family: token(fonts.nativeFont);

  &:hover {
    text-decoration: underline;
  }
`

/* ----------------------------------- Pills ---------------------------------- */

export const StatusPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: token(radii.full);
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  transition: all 150ms ease;

  &[data-type="doing"] {
    background: #e0f2fe;
    color: #0284c7;
  }

  &[data-type="done"] {
    background: token(colors.success);
    color: #166534;
  }

  &[data-type="todo"] {
    background: token(colors.surface);
    color: token(colors.foreground);
    border-color: token(colors.border);
  }

  &[data-type="low"] {
    background: token(colors.success);
    color: #166534;
  }

  &[data-type="medium"] {
    background: token(colors.warning);
    color: #d97706;
  }

  &[data-type="high"] {
    background: token(colors.error);
    color: token(colors.error);
  }

  &[data-type="category"] {
    background: #f3e8ff;
    color: #7c3aed;
  }
`

export const StatusPillDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: token(radii.full);
  background: currentColor;
  flex-shrink: 0;
`

/* ------------------------------ Detail sections ----------------------------- */

export const DetailSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`

export const DetailSectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: token(spacing.sm);
`

export const DetailSectionTitle = styled.h3`
  margin: 0;
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
  display: flex;
  align-items: center;
  gap: 6px;
`

export const DetailSectionCount = styled.span`
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  color: token(colors.textMuted);
  background: token(colors.surface);
  padding: 2px 8px;
  border-radius: token(radii.full);
  min-width: 22px;
  text-align: center;
`

export const DetailSectionAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: token(radii.md);
  border: 1px solid token(colors.border);
  background: token(colors.bg);
  color: token(colors.foreground);
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  transition: all 150ms ease;

  &:hover {
    background: token(colors.surface);
    border-color: token(colors.border);
  }
`

/* --------------------------------- Subtasks --------------------------------- */

export const SubtaskCard = styled.div`
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  padding: 14px;
  background: token(colors.bg);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  overflow: hidden;
`

export const SubtaskCardBorder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #f3e8ff;
  border-radius: token(radii.lg) 0 0 token(radii.lg);
`

export const SubtaskCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const SubtaskCardTitle = styled.h4`
  margin: 0;
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
`

export const SubtaskCardActions = styled.div`
  display: flex;
  align-items: center;
  gap: token(spacing.xs);
`

export const SubtaskCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

/* --------------------------------- Comments --------------------------------- */

export const CommentInputWrapper = styled.div`
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  padding: 10px 12px;
  background: token(colors.bg);
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

export const CommentInput = styled.textarea`
  width: 100%;
  border: none;
  background: transparent;
  resize: none;
  font-size: token(fontSizes.body-sm);
  line-height: 1.5;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  min-height: 18px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: token(colors.border);
  }
`

export const CommentInputActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: token(spacing.sm);
`

export const CommentInputIconButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: token(radii.md);
  border: none;
  background: transparent;
  color: token(colors.textMuted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: token(colors.surface);
    color: token(colors.foreground);
  }
`

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.md);
`

export const CommentItem = styled.div`
  display: flex;
  gap: 10px;
`

export const CommentAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: token(radii.full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: token(fontSizes.label-md);
  font-weight: 700;
  color: token(colors.bg);
  flex-shrink: 0;
  background: token(colors.primary);
`

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);
  min-width: 0;
  flex: 1;
`

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const CommentAuthorGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`

export const CommentAuthor = styled.span`
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
`

export const CommentDate = styled.span`
  font-size: token(fontSizes.label-md);
  color: token(colors.textMuted);
  font-family: token(fonts.nativeFont);
`

export const CommentText = styled.p`
  margin: 0;
  font-size: token(fontSizes.body-sm);
  line-height: 1.5;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
`

export const CommentReplyButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  color: token(colors.primary);
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  display: inline-flex;
  align-items: center;
  gap: token(spacing.xs);

  &:hover {
    text-decoration: underline;
  }
`
