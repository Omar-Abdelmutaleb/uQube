import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import Video from "./pages/Video";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search"
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";

const Container = styled.div`
  display: flex;

`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  overflow:hidden;
`;

const Wrapper = styled.div`
  padding: 25px 25px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search  />} />
                  <Route path="signin" element={<SignIn  />} />
                  <Route path="register" element={<Register  />} />
                  <Route path="registerSuccess" element={<RegisterSuccess  />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
