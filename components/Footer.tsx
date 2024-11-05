
"use client";
import React from "react";
import { socialMedia } from "@/data";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-end items-center">

        <div className="flex items-center md:gap-3 gap-6">
  {socialMedia.map((info) => (
    <div
      key={info.id}
      onClick={() => window.open(info.url, "_blank")}
      className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
    >
      <Image src={info.img} alt="icon" width={20} height={20} />
    </div>
  ))}
</div>
      </div>
    </footer>
  );
};

export default Footer;