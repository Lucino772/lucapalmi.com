export default function About() {
    return (
        <div className="absolute top-[50%] right-0 left-0 flex w-full -translate-y-1/2 items-center justify-evenly overflow-hidden">
            <div className="relative flex max-w-[700px] flex-col justify-center px-6 text-white md:px-0">
                <h1 className="font-headings relative animate-[about-h1_200ms_0ms_ease-in-out_normal_forwards] text-3xl font-semibold opacity-0 md:text-5xl">
                    About
                </h1>
                <div className="font-content text-base text-white/75">
                    <p className="relative mt-3 animate-[about-h1_300ms_100ms_ease-in-out_normal_forwards] text-base font-normal opacity-0 md:text-xl">
                        {`I've always liked making things. When I was younger,
                        that meant Lego worlds taking over the living room and
                        endless Minecraft worlds built block by block. The
                        appeal was simple: you could start with nothing, apply
                        imagination and logic, and end up with something that
                        felt like yours.`}
                    </p>
                    <p className="relative mt-3 animate-[about-h1_300ms_200ms_ease-in-out_normal_forwards] text-base font-normal opacity-0 md:text-xl">
                        {`Software became the natural extension of that. It has
                        the same open-ended space, just without the part where
                        you step on a brick at 2 AM. I've been coding since I
                        was young enough that printing text on a screen felt
                        like a magic trick. Over time, what started as “let's
                        see what this does” gradually turned into a way of
                        understanding the world: patterns, abstractions, the
                        quiet logic behind messy problems.`}
                    </p>
                    <p className="relative mt-3 animate-[about-h1_300ms_300ms_ease-in-out_normal_forwards] text-base font-normal opacity-0 md:text-xl">
                        {`Outside of code, I tend to follow ideas the way some
                        people follow hiking trails: out of curiosity more than
                        destination. I like learning in the broad sense and
                        letting curiosity set the pace. I value good
                        conversations, good friends, and the occasional
                        late-night gaming session that lasts longer than planned
                        but feels entirely justified.`}
                    </p>
                </div>
            </div>
        </div>
    );
}
