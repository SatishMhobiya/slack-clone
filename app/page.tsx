"use client";
import UserButton from "@/features/auth/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();
  const router = useRouter();

  const workspaceId = data?.[0]?._id;

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`)
    } else if (!open) {
      setOpen(true);
    }

  }, [workspaceId, isLoading])

  return (
    <>
      <UserButton />
    </>);
}
