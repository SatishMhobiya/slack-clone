import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface HintProps {
    label: string,
    children: React.ReactNode,
    side?: "left" | "top" | "bottom" | "right",
    align?: 'center' | 'end' | 'start'
}

export const Hint = (
    {
        label,
        children,
        side,
        align
    }: HintProps
) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={20}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="border border-white/5 text-white bg-black ">
                    <p className="font-medium text-xs">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}
