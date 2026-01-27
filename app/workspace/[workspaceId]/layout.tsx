'use client'
import React from 'react'
import Toolbar from './toolbar'
import Sidebar from './sidebar'
import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels'
import { GripVerticalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import WorkspaceSidebar from './workspace-sidebar'

interface WorkspaceIdLayoutProps {
    children: React.ReactNode
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {

    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
        id: "ca-workspace-layout",
        storage: localStorage
    });

    return (
        <div className='h-full'>
            <Toolbar />
            <div className='flex h-[calc(100vh-40px)]'>
                <Sidebar />
                <Group orientation='horizontal' defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
                    <Panel
                        defaultSize={"30%"}
                        minSize={"20%"}
                        className='bg-[#5E2C5F]'
                    >
                        <WorkspaceSidebar />
                    </Panel>
                    <Separator className={cn(
                        "relative flex w-px items-center justify-center bg-border data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
                    )}>
                        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
                            <GripVerticalIcon className="h-2.5 w-2.5" />
                        </div>
                    </Separator>
                    <Panel
                        minSize={"20%"}
                    >
                        {children}
                    </Panel>
                </Group>
            </div>

        </div>
    )
}

export default WorkspaceIdLayout