import { useId, useRef, useState } from "react"
import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { useNomenclatureSearch } from "@/hooks/useNomenclatureSearch"

const Wrapper = styled.div`
  position: relative;
`

const SuggestionsBox = styled.ul`
  position: absolute;
  z-index: 100;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: token(colors.elevated);
  border: 1px solid token(colors.elevated);
  border-radius: token(radii.md);
  box-shadow: 0 8px 24px token(colors.shadow);
  max-height: 240px;
  overflow-y: auto;
  list-style: none;
  padding: 4px;
  margin: 0;
`

const SuggestionItem = styled.li`
  padding: token(spacing.sm) 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: token(spacing.sm);
  font-family: token(fonts.nativeFont);

  &:hover,
  &[data-highlighted="true"] {
    background: token(colors.elevated);
  }
`

const SuggestionCode = styled.span`
  font-size: token(fontSizes.label-md);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, token(colors.primary) 12%, transparent);
  color: token(colors.primary);
  padding: 2px 6px;
  border-radius: token(radii.sm);
  flex-shrink: 0;
`

const SuggestionDescription = styled.span`
  font-size: token(fontSizes.label-md);
  color: token(colors.foreground);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: token(colors.textMuted);
  font-size: token(fontSizes.body-md);
  padding: 2px 4px;
  line-height: 1;
  &:hover {
    color: token(colors.foreground);
  }
`

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
                <SuggestionDescription title={s.description}>
                  {s.description}
                </SuggestionDescription>
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
