import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles, Container, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/Home";
import Header from "./components/Header";
import AuthContextProvider from "./contexts/AuthContext";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthContextProvider>
          <Header />
          <Container maxWidth="md">
            <Routes>
              <Route path="/account/sign-in" element={<SignInPage />} />
              <Route path="/account/sign-up" element={<SignUpPage />} />
              <Route path="/" element={<HomePage />} />;
            </Routes>
          </Container>
        </AuthContextProvider>
      </Router>
      <GlobalStyles
        styles={{
          a: { textDecoration: "none", font: "inherit", color: "inherit" },
        }}
      />
      <CssBaseline />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
