import useCurrentMember from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./workspace-header";

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })

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
        <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
    )
}

export default WorkspaceSidebar