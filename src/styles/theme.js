export const theme = {
  //font-color
  fontMain: "#111",
  fontSub: "#999",
  //prefix-color
  purple: "#7814dc",
  red: "#f20e42",
  green: "#03d85e",
  black: "#111",
  blue: "#3390ff",
  //font-size
  fontLarge: "48px",
  fontMedium: "28px",
  fontRegular: "18px",
  fontSmall: "16px",
  fontMicro: "14px",
  // font-weight
  weightBold: "700",
  weightSemiBold: "600",
  weightRegular: "400",
  // border
  border: "1px solid #eeeeee",
  // mixin
  flexMixin: (direction = "row", align = "center", justify = "center") => `
    display:flex;
    flex-direction:${direction};
    align-items:${align};
    justify-content:${justify}
    `,
  wrapper: (width = "1040px", margin = "0") => `
      width: ${width};
      margin: ${margin} auto;
    `,
};
