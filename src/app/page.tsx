"use client"
import Image from "next/image";
import { RequestForm } from "@/components/form"
import { JsonEditor } from "@/components/json-editor"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[40%]">
        <h1 className="text-3xl font-bold">Inference API Demo</h1>
      </div>
      <div className="">
        <JsonEditor />
      </div>
    </main>
  );
}
