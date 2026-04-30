import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/redux";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.user.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
