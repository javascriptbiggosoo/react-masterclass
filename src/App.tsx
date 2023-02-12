import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";

const GlobalStyle = createGlobalStyle`

/* 리셋 */
${reset}
/* 폰트 */
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
/* import { isDarkAtom } from './atoms';
etc */
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a{
  text-decoration: none;
  color: inherit;
}
`;

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
