import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  CommentAuthor,
  CommentAuthorGroup,
  CommentAvatar,
  CommentContent,
  CommentDate,
  CommentHeader,
  CommentInput,
  CommentInputActions,
  CommentInputIconButton,
  CommentInputWrapper,
  CommentItem,
  CommentList,
  CommentReplyButton,
  CommentText,
  DetailDrawerIconButton,
  DetailMetaDescription,
  DetailMetaIcon,
  DetailMetaLabel,
  DetailMetaList,
  DetailMetaRow,
  DetailMetaValue,
  DetailReadMore,
  DetailSectionAction,
  DetailSectionCount,
  DetailSectionHeader,
  DetailSectionTitle,
  DetailSectionTitleGroup,
  StatusPill,
  StatusPillDot,
  SubtaskCard,
  SubtaskCardActions,
  SubtaskCardBorder,
  SubtaskCardContent,
  SubtaskCardHeader,
  SubtaskCardTitle,
} from "./Drawer.styled"
import {
  AttachmentIcon,
  CalendarIcon,
  CategoryIcon,
  ChecklistIcon,
  ChevronDownIcon,
  CommentsIcon,
  MoreIcon,
  NotificationIcon,
  PriorityIcon,
  ReminderIcon,
  SendIcon,
  StatusIcon,
  UserIcon,
} from "./icons"

/* ---------------------------------- Meta ----------------------------------- */

type DetailMetaProps = {
  icon?: ReactNode
  /** Label textuel. Laisser vide pour n'afficher que l'icône. */
  label?: ReactNode
  children: ReactNode
}

export function DetailMeta({ icon, label, children }: DetailMetaProps) {
  return (
    <DetailMetaRow>
      <DetailMetaLabel aria-hidden={!label}>
        {icon && <DetailMetaIcon>{icon}</DetailMetaIcon>}
        {label}
      </DetailMetaLabel>
      <DetailMetaValue>{children}</DetailMetaValue>
    </DetailMetaRow>
  )
}

export { DetailMetaList }

const DEFAULT_TRUNCATE_LENGTH = 140

type DetailDescriptionProps = {
  children: string
  maxLength?: number
}

export function DetailDescription({ children, maxLength = DEFAULT_TRUNCATE_LENGTH }: DetailDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const shouldTruncate = children.length > maxLength
  const displayText = useMemo(() => {
    if (!shouldTruncate || expanded) return children
    return `${children.slice(0, maxLength).trim()}...`
  }, [children, expanded, maxLength, shouldTruncate])

  return (
    <DetailMetaDescription>
      {displayText}
      {shouldTruncate && (
        <DetailReadMore type="button" onClick={() => setExpanded((v) => !v)}>
          {expanded ? " Show less" : "Read more"}
        </DetailReadMore>
      )}
    </DetailMetaDescription>
  )
}

/* ---------------------------------- Pills ---------------------------------- */

type StatusType = "doing" | "done" | "todo" | "low" | "medium" | "high" | "category"

type StatusPillProps = {
  type: StatusType
  children: ReactNode
  showDot?: boolean
  onClick?: () => void
}

export function StatusPillButton({ type, children, showDot = true, onClick }: StatusPillProps) {
  return (
    <StatusPill data-type={type} onClick={onClick} type="button">
      {showDot && <StatusPillDot />}
      {children}
      <ChevronDownIcon width={12} height={12} />
    </StatusPill>
  )
}

/* -------------------------------- Sections --------------------------------- */

type DetailSectionProps = {
  icon?: ReactNode
  /** Titre de section. Laisser vide pour un groupe sans header. */
  title?: ReactNode
  count?: number
  action?: ReactNode
  children: ReactNode
}

export function DetailSection({ icon, title, count, action, children }: DetailSectionProps) {
  const hasHeader = title !== undefined

  return (
    <section>
      {hasHeader && (
        <DetailSectionHeader>
          <DetailSectionTitleGroup>
            <DetailSectionTitle>
              {icon}
              {title}
            </DetailSectionTitle>
            {count !== undefined && <DetailSectionCount>{count}</DetailSectionCount>}
          </DetailSectionTitleGroup>
          {action}
        </DetailSectionHeader>
      )}
      {children}
    </section>
  )
}

export { DetailSectionAction }

/* --------------------------------- Subtasks -------------------------------- */

type SubtaskProps = {
  title: ReactNode
  badge?: ReactNode
  children: ReactNode
  borderColor?: string
}

export function Subtask({ title, badge, children, borderColor }: SubtaskProps) {
  return (
    <SubtaskCard>
      <SubtaskCardBorder style={{ background: borderColor }} />
      <SubtaskCardHeader>
        <SubtaskCardTitle>{title}</SubtaskCardTitle>
        <SubtaskCardActions>
          {badge}
          <DetailDrawerIconButton type="button" aria-label="Notifications">
            <NotificationIcon width={16} height={16} />
          </DetailDrawerIconButton>
          <DetailDrawerIconButton type="button" aria-label="Plus d'actions">
            <MoreIcon width={16} height={16} />
          </DetailDrawerIconButton>
        </SubtaskCardActions>
      </SubtaskCardHeader>
      <SubtaskCardContent>{children}</SubtaskCardContent>
    </SubtaskCard>
  )
}

/* --------------------------------- Comments -------------------------------- */

type Comment = {
  id: string
  author: string
  avatarColor?: string
  initials?: string
  date: string
  text: string
}

type CommentSectionProps = {
  comments: Comment[]
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  onAttach?: () => void
}

export function CommentSection({ comments, value, onChange, onSubmit, onAttach }: CommentSectionProps) {
  return (
    <section>
      <DetailSectionHeader>
        <DetailSectionTitleGroup>
          <DetailSectionTitle>
            <CommentsIcon />
            Comments
          </DetailSectionTitle>
          <DetailSectionCount>{comments.length}</DetailSectionCount>
        </DetailSectionTitleGroup>
      </DetailSectionHeader>

      <CommentInputWrapper>
        <CommentInput
          placeholder="Type comment"
          rows={1}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <CommentInputActions>
          <CommentInputIconButton type="button" onClick={onAttach} aria-label="Joindre un fichier">
            <AttachmentIcon />
          </CommentInputIconButton>
          <CommentInputIconButton type="button" onClick={onSubmit} aria-label="Envoyer">
            <SendIcon />
          </CommentInputIconButton>
        </CommentInputActions>
      </CommentInputWrapper>

      <CommentList style={{ marginTop: 20 }}>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAvatar style={{ background: comment.avatarColor }}>
              {comment.initials ?? comment.author.charAt(0).toUpperCase()}
            </CommentAvatar>
            <CommentContent>
              <CommentHeader>
                <CommentAuthorGroup>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentDate>{comment.date}</CommentDate>
                </CommentAuthorGroup>
                <DetailDrawerIconButton type="button" aria-label="Plus d'actions">
                  <MoreIcon width={14} height={14} />
                </DetailDrawerIconButton>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
              <CommentReplyButton type="button">
                <ReplyIcon />
                Reply
              </CommentReplyButton>
            </CommentContent>
          </CommentItem>
        ))}
      </CommentList>
    </section>
  )
}

/* --------------------------------- Icons ----------------------------------- */

function ReplyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  )
}

export {
  CalendarIcon,
  CategoryIcon,
  ChecklistIcon,
  CommentsIcon,
  PriorityIcon,
  ReminderIcon,
  StatusIcon,
  UserIcon,
}
