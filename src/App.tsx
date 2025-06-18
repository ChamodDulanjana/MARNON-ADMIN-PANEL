import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/pages/layout.tsx";
import Dashboard from "@/app/dashboard/page.tsx";
import {HeroUIProvider, ToastProvider} from "@heroui/react";

function App() {

  return (
    <div>
        <BrowserRouter>
            <HeroUIProvider>
                <ToastProvider/>
                <Routes>
                    {/* Redirect from "/" to "/admin-panel" */}
                    <Route path="/" element={<Navigate to="/admin-panel" replace />} />

                    {/* Admin panel layout and nested routes */}
                    <Route path="/admin-panel" element={<Layout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<div />} />
                    </Route>
                </Routes>
            </HeroUIProvider>
        </BrowserRouter>
    </div>
  )
}

export default App
