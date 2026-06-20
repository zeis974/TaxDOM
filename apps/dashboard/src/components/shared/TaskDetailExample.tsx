import { useState } from "react"
import {
  CalendarIcon,
  CategoryIcon,
  ChecklistIcon,
  CommentSection,
  DefaultHeaderActions,
  DetailDescription,
  DetailMeta,
  DetailMetaList,
  DetailSection,
  DetailSectionAction,
  EntityDetailDrawer,
  PlusIcon,
  PriorityIcon,
  ReminderIcon,
  StatusIcon,
  StatusPillButton,
  Subtask,
  UserIcon,
} from "@/components/shared"

/**
 * Exemple compact du design "Task Detail".
 *
 * Header unique, sections sans titres superflus, icônes seules pour les métadonnées.
 */
export function TaskDetailExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Ouvrir le drawer exemple
      </button>

      <EntityDetailDrawer
        open={open}
        onOpenChange={setOpen}
        title="Implementation of learning"
        currentIndex={0}
        total={100}
        onPrev={() => {}}
        onNext={() => {}}
        headerActions={<DefaultHeaderActions />}
      >
        {/* Métadonnées — icônes seules, pas de labels répétitifs */}
        <DetailMetaList>
          <DetailMeta icon={<span title="Status"><StatusIcon /></span>}>
            <StatusPillButton type="doing">Doing</StatusPillButton>
          </DetailMeta>

          <DetailMeta icon={<span title="Created by"><UserIcon /></span>}>
            <span>Ahmad Zainy</span>
          </DetailMeta>

          <DetailMeta icon={<span title="Date & Time"><CalendarIcon /></span>}>
            <span>12 Feb 2025, 12:05 PM</span>
          </DetailMeta>

          <DetailMeta icon={<span title="Category"><CategoryIcon /></span>}>
            <span>SOP Working</span>
          </DetailMeta>

          <DetailMeta icon={<span title="Priority"><PriorityIcon /></span>}>
            <StatusPillButton type="low">Low</StatusPillButton>
          </DetailMeta>

          <DetailMeta icon={<span title="Reminder"><ReminderIcon /></span>}>
            <span>16 Feb 2025, 12:05 PM</span>
          </DetailMeta>

          <DetailMeta icon={<span title="Description"><ChecklistIcon /></span>} label="Description">
            <DetailDescription>
              Resources used to familiarize oneself with a topic, subject, or skill before a
              significant event or learning experience.
            </DetailDescription>
          </DetailMeta>
        </DetailMetaList>

        {/* Sous-tâches — pas de titre, juste l'action */}
        <DetailSection
          action={
            <DetailSectionAction type="button">
              <PlusIcon />
              Add
            </DetailSectionAction>
          }
        >
          <Subtask
            title="Review Curriculum Requirements"
            badge={<StatusPillButton type="doing">Doing</StatusPillButton>}
            borderColor="#a78bfa"
          >
            <DetailMetaList>
              <DetailMeta icon={<span title="Priority"><PriorityIcon /></span>}>
                <StatusPillButton type="low">Low</StatusPillButton>
              </DetailMeta>
              <DetailMeta icon={<span title="Description"><ChecklistIcon /></span>} label="Description">
                <DetailDescription maxLength={90}>
                  Review the curriculum standards and learning objectives.
                </DetailDescription>
              </DetailMeta>
            </DetailMetaList>
          </Subtask>
        </DetailSection>

        {/* Commentaires */}
        <CommentSection
          comments={[
            {
              id: "1",
              author: "Lydia Workman",
              initials: "L",
              avatarColor: "#16a34a",
              date: "14 Apr 2025, 12:15 PM",
              text: "Candidate presents herself professionally with a clear passion for employee development. Articulate, confident, and well-prepared.",
            },
            {
              id: "2",
              author: "Ahmad Zainy",
              initials: "A",
              avatarColor: "#3498db",
              date: "14 Apr 2025, 11:25 PM",
              text: "Great progress on the curriculum review. Let’s sync tomorrow.",
            },
          ]}
        />
      </EntityDetailDrawer>
    </>
  )
}
