
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'

interface UserGetMembers {
    workspaceId: Id<"workspaces">
}

const useGetMembers = ({ workspaceId }: UserGetMembers) => {
    const data = useQuery(api.members.get, { workspaceId })
    const isLoading = data === undefined;
    return { data, isLoading }
}

export default useGetMembers