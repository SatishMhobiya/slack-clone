'use client'
import { useParams } from "next/navigation"

type workspaceIdPageParams = {
    workspaceId: string
}


const WorkspaceIdPage = () => {
    const params = useParams<workspaceIdPageParams>()
    console.log(params)

    return (
        <div>Workspace: {params.workspaceId}</div>
    )
}

export default WorkspaceIdPage