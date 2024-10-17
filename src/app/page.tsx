// import { ModeToggle } from "@/components/dark-mode-toggle";

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Hello, World!</h1>
        <p className="text-xl text-gray-600">Welcome to my Next.js application.</p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
