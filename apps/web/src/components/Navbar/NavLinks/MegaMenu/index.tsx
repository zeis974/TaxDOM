import { AnimatePresence, easeIn, easeOut, useIsPresent } from "motion/react"
import Link from "next/link"
import { useId, useState } from "react"
import { ArrowRightIcon } from "@/components/Icons"
import { type Tool, tools } from "../tools"
import Illustration from "./Illustration"
import {
  Badge,
  GroupLabel,
  List,
  Panel,
  Preview,
  PreviewContent,
  PreviewDescription,
  PreviewHeader,
  PreviewName,
  ToolArrow,
  ToolIcon,
  ToolName,
  ToolRow,
  ToolSummary,
  Tools,
  ToolText,
} from "./MegaMenu.styled"

const available = tools.filter((tool) => tool.slug)
const upcoming = tools.filter((tool) => !tool.slug)

type Props = {
  id: string
  close: () => void
}

export default function MegaMenu({ id, close }: Props) {
  const [active, setActive] = useState(tools[0])
  const labelId = useId()
  // The panel lingers during its exit animation: keep it out of the tab order and a11y tree meanwhile
  const isPresent = useIsPresent()

  const renderRow = (tool: Tool) => {
    const content = (
      <>
        <ToolIcon>{tool.icon}</ToolIcon>
        <ToolText>
          <ToolName>{tool.name}</ToolName>
          <ToolSummary>{tool.summary}</ToolSummary>
        </ToolText>
        {tool.slug ? (
          <ToolArrow>
            <ArrowRightIcon />
          </ToolArrow>
        ) : null}
      </>
    )

    return (
      <ToolRow key={tool.name} data-active={active === tool}>
        {tool.slug ? (
          <Link
            href={tool.slug}
            onClick={close}
            onMouseEnter={() => setActive(tool)}
            onFocus={() => setActive(tool)}
          >
            {content}
          </Link>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            aria-describedby={labelId}
            onMouseEnter={() => setActive(tool)}
            onFocus={() => setActive(tool)}
          >
            {content}
          </button>
        )}
      </ToolRow>
    )
  }

  return (
    <Panel
      id={id}
      inert={!isPresent}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -8, opacity: 0, transition: { duration: 0.15, ease: easeIn } }}
      transition={{ duration: 0.18, ease: easeOut }}
    >
      <Tools>
        <List role="list">{available.map(renderRow)}</List>
        <GroupLabel id={labelId}>Bientôt</GroupLabel>
        <List role="list" aria-labelledby={labelId}>
          {upcoming.map(renderRow)}
        </List>
      </Tools>
      <Preview>
        <AnimatePresence initial={false} mode="popLayout">
          <PreviewContent
            key={active.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.08, ease: easeIn } }}
            transition={{ duration: 0.2, ease: easeOut }}
          >
            <PreviewHeader>
              <PreviewName>{active.name}</PreviewName>
              {!active.slug && <Badge>Bientôt</Badge>}
            </PreviewHeader>
            <PreviewDescription>{active.description}</PreviewDescription>
            <Illustration
              kind={active.visual.kind}
              title={active.visual.title}
              icon={active.icon}
            />
          </PreviewContent>
        </AnimatePresence>
      </Preview>
    </Panel>
  )
}
