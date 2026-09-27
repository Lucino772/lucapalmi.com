"use client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export const AiImageDescription = ({ prompt }: { prompt: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="text-faint hover:text-fg -ml-1 flex cursor-pointer items-center gap-1.5 rounded-[3px] px-1 py-0.5 font-mono text-[0.8125rem] transition-colors duration-150 max-sm:-my-2.5 max-sm:py-3 pointer-coarse:-my-2.5 pointer-coarse:py-3">
                <ChevronRightIcon
                    aria-hidden
                    className={cn(
                        "size-3.5 transition-transform duration-200",
                        open && "rotate-90",
                    )}
                />
                AI-generated image. {open ? "Hide" : "Show"} the prompt
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-[radix-collapsible-slide-up_200ms_ease-out] data-[state=open]:animate-[radix-collapsible-slide-down_200ms_ease-out]">
                <p className="border-line text-muted mt-2 ml-1.5 max-w-[42rem] border-l pl-4 font-serif text-[0.9375rem] leading-7">
                    {prompt}
                </p>
            </CollapsibleContent>
        </Collapsible>
    );
};
