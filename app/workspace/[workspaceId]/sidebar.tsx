import UserButton from '@/features/auth/user-button'
import React from 'react'
import WorkspaceSwitcher from './workspace-switcher'
import SidebarButton from './sidebar-button'
import { Bell, Home, HomeIcon, MessageSquare, MoreHorizontal } from 'lucide-react'

const Sidebar = () => {
    return (
        <aside className='w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]'>

            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="Home" isActive={true} />
            <SidebarButton icon={MessageSquare} label="DMs" />
            <SidebarButton icon={Bell} label="Activity" />
            <SidebarButton icon={MoreHorizontal} label="More" />

            <div className='flex flex-col items-center justify-center mt-auto gap-y-1'>
                <UserButton />
            </div>
        </aside>
    )
}

export default Sidebar