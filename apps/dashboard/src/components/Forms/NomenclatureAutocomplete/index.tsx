import { useId, useRef, useState } from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { useNomenclatureSearch } from "@/hooks/useNomenclatureSearch"
import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

const Wrapper = styled("div", {
  base: {
    position: "relative",
  },
})

const SuggestionsBox = styled("ul", {
  base: {
    position: "absolute",
    zIndex: "100",
    top: "calc(100% + 4px)",
    left: "0",
    right: "0",
    background: "{colors.elevated}",
    border: "1px solid {colors.elevated}",
    borderRadius: "{radii.md}",
    boxShadow: "0 8px 24px {colors.shadow}",
    maxHeight: "240px",
    overflowY: "auto",
    listStyle: "none",
    padding: "{spacing.xs}",
    margin: "0",
  },
})

const SuggestionItem = styled("li", {
  base: {
    padding: "{spacing.sm} 12px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "baseline",
    gap: "{spacing.sm}",
    fontFamily: "{fonts.nativeFont}",
    '&:hover, &[data-highlighted="true"]': {
      background: "{colors.elevated}",
    },
  },
})

const SuggestionCode = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "700",
    fontVariantNumeric: "tabular-nums",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    padding: "2px 6px",
    borderRadius: "{radii.sm}",
    flexShrink: "0",
  },
})

const SuggestionDescription = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    color: "{colors.foreground}",
    flex: "1",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

const ClearButton = styled("button", {
  base: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-md}",
    padding: "2px 4px",
    lineHeight: "1",
    "&:hover": {
      color: "{colors.foreground}",
    },
  },
})

interface NomenclatureAutocompleteProps {
  label: string
  hint?: string
  value: string
  onChange: (code: string, description: string) => void
  onClear?: () => void
  placeholder?: string
  disabled?: boolean
}

export default function NomenclatureAutocomplete({
  label,
  hint,
  value,
  onChange,
  onClear,
  placeholder = "Ex: 8517130000",
  disabled,
}: NomenclatureAutocompleteProps) {
  const id = useId()
  const [inputText, setInputText] = useState(value)
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const { suggestions } = useNomenclatureSearch(inputText)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleInput = (text: string) => {
    setInputText(text)
    setOpen(true)
    setHighlighted(0)
  }

  const handleSelect = (code: string, description: string) => {
    setInputText(`[${code}] ${description}`)
    onChange(code, description)
    setOpen(false)
  }

  const handleClear = () => {
    setInputText("")
    onClear?.()
    onChange("", "")
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = suggestions[highlighted]
      if (item) handleSelect(item.code, item.description)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <InputContainer>
      <label htmlFor={id}>{label}</label>
      <Wrapper ref={wrapperRef}>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={inputText}
          autoComplete="off"
          disabled={disabled}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => inputText.length >= 2 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          onKeyDown={handleKeyDown}
          style={{ paddingRight: inputText ? "28px" : undefined }}
        />
        {inputText && (
          <ClearButton type="button" onClick={handleClear} tabIndex={-1} aria-label="Effacer">
            ×
          </ClearButton>
        )}
        {open && suggestions.length > 0 && (
          <SuggestionsBox role="listbox">
            {suggestions.map((s, i) => (
              <SuggestionItem
                key={s.code}
                role="option"
                data-highlighted={i === highlighted ? "true" : "false"}
                onMouseDown={() => handleSelect(s.code, s.description)}
              >
                <SuggestionCode>{s.code}</SuggestionCode>
                <SuggestionDescription title={s.description}>{s.description}</SuggestionDescription>
              </SuggestionItem>
            ))}
          </SuggestionsBox>
        )}
      </Wrapper>
      {hint && (
        <span style={{ fontSize: "11px", color: token("colors.textMuted"), marginTop: "4px" }}>
          {hint}
        </span>
      )}
    </InputContainer>
  )
}
