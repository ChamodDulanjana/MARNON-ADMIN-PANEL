import {
    Sidebar,
    SidebarContent,
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
                    <SidebarGroup className='h-full'>
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

                                <SidebarMenuItem key={"exit-admin-panel"} className='absolute bottom-4'>
                                    <SidebarMenuButton asChild className='w-full pr-24'>
                                        <a href={VITE_WEB_URL}>
                                            <span>
                                                <TbArrowBackUp className='mt-[1px] text-lg'/>
                                            </span>
                                            <span className="text-[14px]">Exit Admin Panel</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    );
};

export default SideNavigation;