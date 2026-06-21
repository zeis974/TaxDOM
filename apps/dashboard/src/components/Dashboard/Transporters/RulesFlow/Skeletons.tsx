import { SkeletonRect } from "@/components/shared/Skeletons"
import {
  FlowBody,
  FlowCanvas,
  FlowContainer,
  FlowHeader,
  FlowTitleWrap,
  PageBackButton,
  PageBody,
  PageContainer,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "./RulesFlow.styled"

const DELAYED_FADE = "fadeIn 0.2s ease-out 180ms both"

function GhostNode({
  top,
  left,
  width = 160,
}: {
  top: number
  left: number
  width?: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        left,
        width,
        padding: "14px 18px",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        animation: DELAYED_FADE,
      }}
    >
      <SkeletonRect style={{ height: 14, width: "70%" }} />
      <SkeletonRect style={{ height: 11, width: "50%" }} />
    </div>
  )
}

export function FlowEditorSkeleton() {
  return (
    <PageContainer aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <PageHeader>
        <PageHeaderLeft>
          <PageBackButton type="button" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </PageBackButton>
          <SkeletonRect style={{ width: 160, height: 18 }} />
        </PageHeaderLeft>
        <PageHeaderRight>
          <SkeletonRect style={{ width: 90, height: 34, borderRadius: 8 }} />
          <SkeletonRect style={{ width: 110, height: 34, borderRadius: 8 }} />
        </PageHeaderRight>
      </PageHeader>
      <PageBody>
        <FlowContainer>
          <FlowHeader>
            <FlowTitleWrap>
              <SkeletonRect style={{ width: 200, height: 16 }} />
              <SkeletonRect style={{ width: 140, height: 12, marginTop: 6 }} />
            </FlowTitleWrap>
          </FlowHeader>
          <FlowBody>
            <FlowCanvas style={{ position: "relative", overflow: "hidden" }}>
              <GhostNode top={80} left={120} width={160} />
              <GhostNode top={200} left={80} width={220} />
              <GhostNode top={200} left={360} width={180} />
              <GhostNode top={340} left={180} width={160} />
            </FlowCanvas>
          </FlowBody>
        </FlowContainer>
      </PageBody>
    </PageContainer>
  )
}
