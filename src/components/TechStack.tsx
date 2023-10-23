"use client";

import Image from "next/image";
import * as technologies from "@/lib/technologies.json";
import { Technologies } from "@/lib/types";

type Props = {
  name: keyof Technologies;
  size?: "normal" | "small";
};

export default function TechStack({ name, size }: Props) {
  const { label, image, alt } = technologies[name];
  if (size === undefined) size = "normal";

  return (
    <div
      className="flex flex-row items-center justify-center gap-2 rounded-3xl px-2 py-2 drop-shadow"
      style={{ background: "#1d1d1d" }}
    >
      <Image
        src={image}
        alt={alt}
        width={size === "normal" ? 32 : 28}
        height={size === "normal" ? 32 : 28}
        className={`${
          size === "normal" ? "h-8 w-8" : "h-7 w-7"
        } rounded-full object-cover`}
      />
      <span
        className={`${size === "normal" ? "text-base" : "text-sm"} text-white`}
      >
        {label}
      </span>
    </div>
  );
}
