import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/pages/layout.tsx";
import Dashboard from "@/app/dashboard/page.tsx";
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import ViewSize from "@/app/size-management/view-size/page.tsx";
import AddSize from "@/app/size-management/add-size/page.tsx";
import ViewCategory from "@/app/category-management/view-category/page.tsx";
import AddCategory from "@/app/category-management/add-category/page.tsx";
import ViewUser from "@/app/user-management/view-user/page.tsx";
import AddUser from "@/app/user-management/add-user/page.tsx";

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

                        {/* Group sizes routes */}
                        <Route path="sizes">
                            {/* Redirect /admin-panel/sizes → /admin-panel/sizes/view-sizes */}
                            <Route index element={<Navigate to="view-sizes" replace />} />
                            <Route path="view-sizes" element={<ViewSize />} />
                            <Route path="add-sizes" element={<AddSize />} />
                            <Route path="edit-sizes/:id" element={<AddSize />} />
                        </Route>

                        {/* Group category routes */}
                        <Route path="category">
                            {/* Redirect /admin-panel/category → /admin-panel/category/view-category */}
                            <Route index element={<Navigate to="view-category" replace />} />
                            <Route path="view-category" element={<ViewCategory />} />
                            <Route path="add-category" element={<AddCategory />} />
                            <Route path="edit-category/:id" element={<AddCategory />} />
                        </Route>

                        {/* Group users routes */}
                        <Route path="users">
                            {/* Redirect /admin-panel/users → /admin-panel/users/view-users */}
                            <Route index element={<Navigate to="view-users" replace />} />
                            <Route path="view-users" element={<ViewUser />} />
                            <Route path="add-users" element={<AddUser />} />
                            <Route path="edit-users/:id" element={<AddUser />} />
                        </Route>
                    </Route>
                </Routes>
            </HeroUIProvider>
        </BrowserRouter>
    </div>
  )
}

export default App
