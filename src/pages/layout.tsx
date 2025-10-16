import {Outlet, useLocation} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import SideNavigation from "@/layouts/side-navigation/page.tsx";
import {Separator} from "@radix-ui/react-separator";
import {Tooltip} from "@heroui/react";


let header = 'Dashboard';
let description = 'Welcome to the admin panel. Here you can manage products, orders, and users.';

const Layout = () => {
    const location = useLocation();

    // Determine the header and description based on the current path
    if (location.pathname.endsWith('/dashboard')) {
        header = 'Dashboard';
        description = 'Welcome to the admin panel. Here you can manage products, orders, and users.';
    } else if (location.pathname.endsWith('/products')) {
        header = 'Products';
        description = 'Manage all products here.';
    } else if (location.pathname.endsWith('/category')) {
        header = 'Category';
        description = 'Manage product categories here.';
    } else if (location.pathname.endsWith('/sizes/view-sizes')) {
        header = 'Sizes';
        description = 'Manage product sizes here.';
    } else if (location.pathname.endsWith('/users')) {
        header = 'Users';
        description = 'Manage users and their roles here.';
    } else if (location.pathname.endsWith('/home-page-images')) {
        header = 'Home Page Images';
        description = 'Manage images displayed on the home page.';
    }

    return (
        <div className="w-full overflow-y-hidden">
            {/* Admin Panel Layout */}
            <SidebarProvider>
                <div className="flex w-full">
                    {/* Admin Side Navigation */}
                    <SideNavigation />

                    {/* Main Content Area */}
                    <div className="w-full px-6 py-8">
                        {/* Page header */}
                        <div className="mb-10">
                            <div className="flex mb-2">
                                <Tooltip content="Toggle Navigation" placement="top">
                                    <SidebarTrigger />
                                </Tooltip>
                                <Separator className="mr-2 ml-1 h-[15px] mt-[6px] border-[1px] border-gray-300" orientation="vertical"/>
                                <h1 className="text-2xl font-semibold -mt-[4px]">{header}</h1>
                            </div>
                            <p className="text-gray-600 text-sm ml-[5px]">{description}</p>
                        </div>

                        {/* Nested Routes */}
                        <Outlet /> {/* This will render the nested route component */}
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Layout;