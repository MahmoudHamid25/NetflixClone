"use client"
import {
  CreditCard,
  Github,
  LayoutDashboard, LogOut,
  User,
} from 'lucide-react';

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Link from "next/link";
import {logout} from "@/lib/actions/auth/auth.actions";
import {User as UserType} from "@/lib/types";
import { useRouter } from 'next/navigation';

export function UserAccount({user}: { user: UserType }) {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.refresh();
  }
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='relative aspect-square h-8 w-8 rounded-full overflow-hidden cursor-pointer'>
            <Image
                fill
                src={"/profile_icon.jpg"}
                alt='Profile picture'
                referrerPolicy='no-referrer'
                sizes='32'
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="truncate">{user.username}</div>
            <div className="text-muted-foreground font-normal truncate">{user.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <User/>
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard"}>
                <LayoutDashboard/>
                <span>Dashboard</span>
                <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem asChild>
            <a href="https://github.com/MahmoudHamid25/NetflixClone" target="_blank">
              <Github/>
              <span>GitHub</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={async () => await handleLogout()} asChild>
            <div>
              <LogOut className='mr-2 h-4 w-4' aria-hidden='true'/>
              Logout
            </div>
          </DropdownMenuItem>
          {/*<LogoutButton/>*/}

        </DropdownMenuContent>
      </DropdownMenu>
  )
}
