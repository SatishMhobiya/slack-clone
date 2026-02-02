import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { FaCaretDown } from "react-icons/fa"
import { useToggle } from 'react-use'

interface WorkspaceSectionProps {
    children: React.ReactNode,
    label: string,
    hint: string,
    onNew?: () => void
}

const WorkspaceSection = (
    {
        children,
        label,
        hint,
        onNew
    }: WorkspaceSectionProps
) => {

    const [on, toggle] = useToggle(true);


    return (
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-1.5 group">
                <Button
                    variant="transparent"
                    className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
                    onClick={toggle}
                >
                    <FaCaretDown className={cn(
                        "size-4 transition-transform",
                        on && "-rotate-90"
                    )} />
                </Button>

                <Button
                    variant='transparent'
                    size='sm'
                    className="group px-1.5 text-[#f9edffcc] flex-1 text-sm h-[28px] justify-start overflow-hidden items-center min-w-0"
                >
                    <span className="truncate">{label}</span>
                </Button>



                {onNew &&
                    <Hint
                        label={label}
                        side="top"
                        align="center"
                    >
                        <Button
                            onClick={onNew}
                            size='iconSm'
                            variant='transparent'
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0 text-[#f9edffcc] size-6 text-sm p-0.5"
                        >
                            <Plus className="size-5" />
                        </Button>
                    </Hint>
                }

            </div>
            {on && children}
        </div>
    )
}

export default WorkspaceSection