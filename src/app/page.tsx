// import { ModeToggle } from "@/components/dark-mode-toggle";

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to our V2G app</h1>
        <div className="space-x-4">
          <Link href="/admin/overview" passHref>
            <Button>
              Go to Admin Overview
            </Button>
          </Link>
          <Link href="/user/search" passHref>
            <Button>
              Go to User Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
