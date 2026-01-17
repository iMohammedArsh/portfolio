import React from "react";

function page() {
  return (
    <div className="flex h-full w-full justify-between">
      {/* right side  */}
      <div className="w-1/2 flex justify-center items-center">About Me</div>
      {/* left side  */}
      <div className="w-1/2 flex flex-col gap-5 p-10 pr-20">
          <p className="text-6xl font-bold">About Me</p>
          <ul className="flex gap-5 align-center justify-start">
            <li className="text-md font-semibold text-green-500">Full-Stack Developer</li>
            <li className="text-md font-semibold text-green-500">UI/UX Designer</li>
            <li className="text-md font-semibold text-green-500">Digital Architect</li>
          </ul>
          <p className="text-md text-justify wrap-break-word text-base/6">In the digital world, most creators choose a side: the engine or the exterior. They focus either on the "pipes" (backend logic) or the "paint" (UI/UX). I find that distinction archaic.
          Think of a high-performance vehicle: the engine’s power is useless if the cockpit is unintuitive, and a beautiful chassis is just a shell if the transmission fails. I treat software development as unified architecture. Whether I am deploying Supabase schemas, optimizing React Native performance, or refining Figma prototypes, my goal is the same: Zero Friction. I don't just write code; I build infrastructure for the "New Era" of digital interaction.</p>
          <div className="flex flex-col gap-5 mt-5">
            <p className="text-4xl font-black">skills</p>
            <ul className="flex gap-5 align-center justify-start">
              <li className="text-md font-semibold bg-white/4 p-5 rounded-md">JavaScript</li>
              <li className="text-md font-semibold bg-white/4 p-5 rounded-md">TypeScript</li>
              <li className="text-md font-semibold bg-white/4 p-5 rounded-md">React</li>
              <li className="text-md font-semibold bg-white/4 p-5 rounded-md">Next.js</li>
              <li className="text-md font-semibold bg-white/4 p-5 rounded-md">Node.js</li>
              <li className="text-md font-semibold bg-white/4 p-5 rounded-md">Figma</li>
            </ul>
          </div>
        </div>
    </div>
  );
}

export default page;
