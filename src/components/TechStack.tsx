"use client";

import Image from "next/image";

type Props = {
  technology: any;
  size?: "normal" | "small";
};

export default function TechStack({ technology, size }: Props) {
  if (size === undefined) size = "normal";

  return (
    <div
      className="flex flex-row items-center justify-center gap-2 rounded-3xl px-2 py-2 drop-shadow"
      style={{ background: "#1d1d1d" }}
    >
      <Image
        src={`https:${technology.fields.icon.fields.file.url}`}
        alt={technology.fields.slug}
        width={technology.fields.icon.fields.file.details.image.width}
        height={technology.fields.icon.fields.file.details.image.width}
        className={`${
          size === "normal" ? "h-8 w-8" : "h-7 w-7"
        } rounded-full object-cover`}
      />
      <span
        className={`${size === "normal" ? "text-base" : "text-sm"} text-white`}
      >
        {technology.fields.name}
      </span>
    </div>
  );
}
