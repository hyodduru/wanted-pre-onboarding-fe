export const theme = {
  //font-color
  fontMain: "#2964FF",
  fontSub: "#EEF1F9",

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

  // mixin
  flexMixin: (direction = "row", align = "center", justify = "center") => `
    display:flex;
    flex-direction:${direction};
    align-items:${align};
    justify-content:${justify}
    `,
  wrapper: (width = "1000px", margin = "0") => `
      width: ${width};
      margin: ${margin} auto;
    `,
};
