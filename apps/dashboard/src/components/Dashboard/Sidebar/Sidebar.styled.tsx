import { styled } from "@/panda/jsx"

export const Container = styled("nav", {
  base: {
    flex: "1",
    background: "{colors.elevated}",
    height: "calc(100% - 10px)",
    padding: "10px",
    margin: "10px",
    borderRadius: "{radii.lg}",
    color: "{colors.foreground}",
    maxWidth: "250px",
    fontFamily: "{fonts.nativeFont}",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "{spacing.md}",
    "& > div:first-child": {
      display: "inherit",
      flexDirection: "column",
      gap: "{spacing.md}",
    },
  },
})

export const Logo = styled("h1", {
  base: {
    color: "{colors.foreground}",
    fontSize: "clamp(1.4em, 5vw, 2em)",
    fontFamily: "{fonts.rowdies}",
  },
})

export const List = styled("ul", {
  base: {
    "& li": {
      marginBottom: "10px",
      borderRadius: "{radii.lg}",
      color: "inherit",
      '&[data-active="true"]': {
        background: "{colors.background}",
      },
      "& a": {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "inherit",
        lineHeight: "1",
        width: "100%",
        height: "100%",
        padding: "8px 10px",
        borderRadius: "10px",
        fontWeight: "500",
        transition: "background 150ms ease",
      },
      "&:hover": {
        background: "{colors.background}",
      },
    },
  },
})

export const UserContainer = styled("div", {
  base: {
    display: "flex",
    gap: "{spacing.sm}",
    padding: "{spacing.s12}",
    borderRadius: "{radii.lg}",
    background: "{colors.elevated}",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export const Avatar = styled("div", {
  base: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "{colors.foreground}",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "{colors.elevated}",
    fontWeight: "600",
    fontSize: "{fontSizes.body-md}",
    flexShrink: "0",
    "& > img": {
      borderRadius: "50%",
      objectFit: "cover",
    },
  },
})

export const UserInfo = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
    overflow: "hidden",
  },
})

export const UserName = styled("span", {
  base: {
    fontWeight: "600",
    fontSize: "{fontSizes.body-sm}",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

export const UserEmail = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    opacity: "0.7",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

export const UserContentWrapper = styled("div", {
  base: {
    display: "flex",
    gap: "{spacing.s12}",
    alignItems: "center",
    flex: "1",
    overflow: "hidden",
  },
})

export const LogoutButton = styled("button", {
  base: {
    background: "none",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "{spacing.xs}",
    flexShrink: "0",
    transition: "opacity 0.2s",
    "& svg": {
      width: "20px",
      height: "20px",
    },
    "&:hover": {
      opacity: "0.7",
    },
    "&:active": {
      opacity: "0.5",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
      borderRadius: "6px",
      opacity: "1",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
})
