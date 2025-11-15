import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/m3tr1c5",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST!,
});
