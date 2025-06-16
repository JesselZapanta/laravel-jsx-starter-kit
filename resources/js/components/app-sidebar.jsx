import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User } from 'lucide-react';
import AppLogo from './app-logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
export function AppSidebar() {
    const page = usePage();
    const { auth } = page.props;

    const navLinks = {
        0: [
            {
                title: 'Dashboard',
                url: '/admin/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'User',
                url: '/admin/user/index',
                icon: User,
            },
        ],
        1: [
            {
                title: 'Dashboard',
                url: '/user/dashboard',
                icon: LayoutGrid,
            },
        ],
    };

    // Dynamically set the main navigation items
    const mainNavItems = navLinks[auth.user.role] || [];

    const footerNavItems = [
        {
            title: 'Repository',
            url: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            url: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        },
    ];

    // const data = {
    //     versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
    //     navMain: [
    //         {
    //             title: 'Getting Started',
    //             url: '#',
    //             items: [
    //                 {
    //                     title: 'Installation',
    //                     url: '#',
    //                 },
    //                 {
    //                     title: 'Project Structure',
    //                     url: '#',
    //                 },
    //             ],
    //         },
    //         {
    //             title: 'Community',
    //             url: '#',
    //             items: [
    //                 {
    //                     title: 'Contribution Guide',
    //                     url: '#',
    //                 },
    //             ],
    //         },
    //     ],
    // };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                {/* {data.navMain.map((item) => (
                    <Collapsible key={item.title} title={item.title} defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                            >
                                <CollapsibleTrigger>
                                    {item.title}{' '}
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild isActive={item.isActive}>
                                                    <a href={item.url}>{item.title}</a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))} */}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
