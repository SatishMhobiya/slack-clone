import React, { ReactEventHandler, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace"
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace"
import { Button } from "@/components/ui/button"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/hooks/use-confirm"

interface PreferencesModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    initialValue: string
}

const PreferencesModal = ({
    open,
    setOpen,
    initialValue
}: PreferencesModalProps) => {
    const workspaceId = useWorkspaceId();

    const [value, setValue] = useState<string>(initialValue)
    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
    const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const router = useRouter();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "This action is irreversible."
    )


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateWorkspace({
            id: workspaceId,
            name: value
        }, {
            onSuccess() {
                toast.success("Workspace updated")
                setOpenEditWorkspace(false);
            },
            onError() {
                toast.error("Failed to update workspace")
            }
        }
        )
    }

    const handleRemove = async () => {
        const ok = await confirm();

        if (!ok) {
            return;
        }
        removeWorkspace({
            id: workspaceId
        }, {
            onSuccess() {
                router.replace('/')
                toast.success("Workspace removed")
            },
            onError() {
                toast.error("Failed to remove workspace")
            }
        })
    }

    return (
        <>
            <ConfirmDialog />
            <Dialog open onOpenChange={setOpen}>
                <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                    <DialogHeader className="p-4 border-b bg-white">
                        <DialogTitle>{value}</DialogTitle>
                    </DialogHeader>
                    <div className="px-4 pb-4 flex flex-col gap-y-2">
                        <Dialog open={openEditWorkspace} onOpenChange={setOpenEditWorkspace}>
                            <DialogTrigger asChild>
                                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold">
                                            Worksapce Name
                                        </p>
                                        <p className="text-sm font-semibold text-[#1264a3] hover:underline">
                                            Edit
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                        {value}
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Rename this workspace</DialogTitle>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <Input
                                        value={value}
                                        disabled={isUpdatingWorkspace}
                                        onChange={(e) => { setValue(e.target.value) }}
                                        placeholder="Workspace name eg. ''work', 'home'"
                                        minLength={3}
                                        required
                                        autoFocus
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant={'outline'} disabled={isUpdatingWorkspace}>
                                                Close
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={isUpdatingWorkspace}>Save</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <button
                            disabled={isRemovingWorkspace}
                            onClick={handleRemove}
                            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
                        >
                            <Trash className="size-4" />
                            <p className="text-sm font-semibold">Delete workspace</p>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default PreferencesModal