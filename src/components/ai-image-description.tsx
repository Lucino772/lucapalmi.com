"use client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export const AiImageDescription = ({ prompt }: { prompt: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="flex cursor-pointer flex-row items-center gap-1 text-sm opacity-75 transition-opacity duration-300 hover:opacity-100">
                {open ? (
                    <ChevronDownIcon className="size-4" />
                ) : (
                    <ChevronRightIcon className="size-4" />
                )}
                AI-generated image, view the prompt used
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3 overflow-hidden pt-2 pl-5 text-sm leading-6 text-[#d1d5dc] data-[state=closed]:animate-[radix-collapsible-slide-up_300ms_ease-in-out] data-[state=open]:animate-[radix-collapsible-slide-down_300ms_ease-in-out]">
                <p>{prompt}</p>
            </CollapsibleContent>
        </Collapsible>
    );
};
