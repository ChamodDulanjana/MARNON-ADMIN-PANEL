import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminDashboard from "@/pages/admin-dashboard.tsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
