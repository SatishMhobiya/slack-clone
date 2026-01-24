import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'
import { Button } from '@/components/ui/button'
import { useCreateWorkspace } from '../api/use-create-workspace'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("")
    const router = useRouter();

    const { mutate } = useCreateWorkspace();

    const handleCloseModal = () => {
        setOpen(false)
        setName("");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ name }, {
            onSuccess(id) {
                toast.success("Workspace created...")
                router.push(`/workspace/${id}`)
                handleCloseModal();
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <Input
                        value={name}
                        disabled={false}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                        autoFocus
                        required
                        minLength={3}
                    />
                    <div className='flex justify-end'>
                        <Button type='submit' disabled={false}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkspaceModal