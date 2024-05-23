export default function AboutText() {
    return (
        <div className="relative flex max-w-[400px] flex-col justify-center px-6 text-white md:px-0">
            <h1 className="relative animate-[about-h1_200ms_0ms_ease-in-out_normal_forwards] text-5xl font-semibold opacity-0">
                About
            </h1>
            <div>
                <p className="relative mt-3 animate-[about-p_500ms_200ms_ease-in-out_normal_forwards] text-xl font-normal leading-6 opacity-0 md:pl-4">
                    {`My name is Luca Palmisano. I'm 20 years old and I'm currently studying
          computer science at university.`}
                </p>
                <p className="relative mt-3 animate-[about-p_500ms_350ms_ease-in-out_normal_forwards] text-xl font-normal leading-6 opacity-0 md:pl-6">
                    {`I've been coding for several years now. Through the years, what was
          once a hobby has became a passion. I have always been interested in
          discovering new things and this has helped me to expand my knowledge
          of information technology.`}
                </p>
                <p className="relative mt-3 animate-[about-p_500ms_500ms_ease-in-out_normal_forwards] text-xl font-normal leading-6 opacity-0 md:pl-8">
                    {`Besides that I am enjoying living a student's life, having fun with my
          friends, playing games, etc. Well, there you have it, this is me! This
          is who I am!`}
                </p>
            </div>
        </div>
    );
}
