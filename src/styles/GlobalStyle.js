import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
   ${reset}
   * {
      box-sizing : border-box;
      outline : none;
    }
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video {
      font-family: 'Noto Sans KR', sans-serif;
    }
    h1 {
      font-size: ${(props) => props.theme.fontLarge};
      font-weight: ${(props) => props.theme.weightBold};
      color: ${(props) => props.theme.fontMain};
    }
    h2 {
      font-size: ${(props) => props.theme.fontMedium};
      font-weight: ${(props) => props.theme.weightSemiBold};
      color: ${(props) => props.theme.fontMain};
    }
    h3 {
      font-size: ${(props) => props.theme.fontRegular};
      font-weight: ${(props) => props.theme.weightRegular};
      color: ${(props) => props.theme.fontMain};
    }
    p {
      font-size: ${(props) => props.theme.fontRegular};
      font-weight: ${(props) => props.theme.weightRegular};
      color: ${(props) => props.theme.fontMain};
    }
    img {
      object-fit: cover;
    }
`;

export default GlobalStyle;
