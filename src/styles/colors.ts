const Yellow = {
  Yellow100: "#FBFBF3",
  Yellow200: "#F7F6E7",
  Yellow300: "#F2F2DA",
  Yellow400: "#EEEDCE",
  Yellow500: "#EAE9C2",
  Yellow600: "#D4D282",
  Yellow700: "#BEBB43",
  Yellow800: "#7F7D2C",
  Yellow900: "#403F16",
} as const

const Red = {
  Red100: "#F4E0D5",
  Red200: "#E8C1AA",
  Red300: "#DDA280",
  Red400: "#D28356",
  Red500: "#BF6633",
  Red600: "#995229",
  Red700: "#733D1F",
  Red800: "#4C2914",
  Red900: "#26140A",
} as const

const Neutral = {
  Neutral100: "#E9E9E9",
  Neutral200: "#D3D3D3",
  Neutral300: "#BCBCBC",
  Neutral400: "#A6A6A6",
  Neutral500: "#909090",
  Neutral600: "#737373",
  Neutral700: "#565656",
  Neutral800: "#3A3A3A",
  Neutral900: "#1D1D1D",
} as const

export const colors = {
  ...Yellow,
  ...Red,
  ...Neutral,
} as const
