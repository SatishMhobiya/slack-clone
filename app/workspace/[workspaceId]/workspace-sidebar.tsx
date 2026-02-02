import useCurrentMember from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, Hash, Loader, MessageSquareText, SendHorizonal } from "lucide-react";
import WorkspaceHeader from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import WorkspaceSection from "./workspace-section";
import useGetMembers from "@/features/members/api/use-get-members";
import UserItem from "./user-item";

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
    const { data: channels, isLoading: channelLoading } = useGetChannels({ workspaceId })
    const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId })

    if (memberLoading || workspaceLoading) {
        return <div className="h-full flex flex-col justify-center items-center">
            <Loader className="size-5 text-white animate-spin" />
        </div>
    }

    if (!member || !workspace) {
        return <div className="h-full flex gap-y-2 bg-[#5E2C5F] flex-col justify-center items-center">
            <AlertTriangle className="size-5 text-white " />
            <p className="text-sm text-white " >Workspace not found</p>
        </div>
    }
    return (
        <div className="flex flex-col bg-[#5E2C5F] h-full">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
            <div className="flex flex-col px-3 mt-3">
                <SidebarItem
                    label="Threads"
                    icon={MessageSquareText}
                    id="threads"
                />
                <SidebarItem
                    label="Drafts & Sent"
                    icon={SendHorizonal}
                    id="drafts "
                />
            </div>
            <WorkspaceSection
                label="Channel"
                hint="New Channel"
                onNew={() => { }}
            >
                {channels?.map((item) => (
                    <SidebarItem
                        key={item._id}
                        label={item.name}
                        icon={Hash}
                        id={item._id}
                    />
                ))}
            </WorkspaceSection>
            <WorkspaceSection
                label="Direct Message"
                hint="New direct message"
                onNew={() => { }}
            >
                {members?.map((item) => (
                    <UserItem
                        id={item._id}
                        key={item._id}
                        label={item?.user?.name}
                        image={item.user?.image}
                    />
                ))}
            </WorkspaceSection>

        </div>
    )
}

export default WorkspaceSidebar