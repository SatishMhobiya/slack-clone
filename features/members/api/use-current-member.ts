
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useQuery } from 'convex/react'

interface UserCurrentMemberProps {
    workspaceId: Id<"workspaces">
}

const useCurrentMember = ({ workspaceId }: UserCurrentMemberProps) => {
    const data = useQuery(api.members.get, { workspaceId })
    const isLoading = data === undefined;
    return { data, isLoading }
}

export default useCurrentMember