// import { ModeToggle } from "@/components/dark-mode-toggle";

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to our V2G app</h1>
        <Link href="/admin/overview" passHref>
          <Button>
            Go to Admin Overview
          </Button>
        </Link>
      </div>
    </div>
  )
}
