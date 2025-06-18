import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { menus} from "@/assets/data/menus.ts"
import { TbArrowBackUp } from "react-icons/tb";

const VITE_WEB_URL: string = import.meta.env.VITE_WEB_URL ?? '';

const SideNavigation = () => {
    return (
        <div>
            <Sidebar collapsible="icon">
                <SidebarContent className="bg-black text-white">
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-white">Admin panel</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="pt-2 gap-2">
                                {menus.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <span>
                                                    <item.icon className="text-lg"/>
                                                </span>
                                                <span className="text-[14px]">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className='bg-black'>
                    <div className="pb-4">
                        <a href={VITE_WEB_URL}  rel="noopener noreferrer">
                            <div className='flex gap-2 ml-1 text-white hover:bg-white hover:text-red-600 py-2 pl-2 rounded-md transition-colors duration-200'>
                                <TbArrowBackUp className='mt-[1px] text-lg'/>
                                <span className="text-[14px]">Exit Admin Panel</span>
                            </div>
                        </a>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
};

export default SideNavigation;