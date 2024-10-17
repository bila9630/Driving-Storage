import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                        john.doe@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$4.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">jane.smith@example.com</p>
                </div>
                <div className="ml-auto font-medium">+$6.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">
                        mike.johnson@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$16.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>EB</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Emily Brown</p>
                    <p className="text-sm text-muted-foreground">emily.brown@example.com</p>
                </div>
                <div className="ml-auto font-medium">+$5.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Alex Lee</p>
                    <p className="text-sm text-muted-foreground">alex.lee@example.com</p>
                </div>
                <div className="ml-auto font-medium">+$4.00</div>
            </div>
        </div>
    )
}
