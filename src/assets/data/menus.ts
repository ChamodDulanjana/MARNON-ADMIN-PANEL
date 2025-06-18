import { TfiDashboard } from "react-icons/tfi";
import { PiDressDuotone } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { IoResizeSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegImages } from "react-icons/fa6";

export const menus = [
    {
        title: "Dashboard",
        url: "/admin-panel/dashboard",
        icon: TfiDashboard,
    },
    {
        title: "Products",
        url: "/admin-panel/products",
        icon: PiDressDuotone,
    },
    {
        title: "Category",
        url: "/admin-panel/category",
        icon: BiCategoryAlt,
    },
    {
        title: "Sizes",
        url: "/admin-panel/sizes",
        icon: IoResizeSharp,
    },
    {
        title: "Users",
        url: "/admin-panel/users",
        icon: FiUser,
    },
    {
        title: "Home Page Images",
        url: "/admin-panel/home-page-images",
        icon: FaRegImages,
    },
]