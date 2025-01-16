'use client'

import {useRouter} from 'next/navigation'
import {LogOut} from 'lucide-react'
import {DropdownMenuItem} from '@/components/ui/dropdown-menu'
import {logout} from "@/lib/actions/auth/auth.actions";
import {startTransition} from "react";

export function LogoutButton() {
  const router = useRouter()
  // const {setUser} = useAuth();

  const handleLogout = async () => {
    await logout();
    // setUser(null);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
      <DropdownMenuItem onClick={handleLogout}>
        <div>
          <LogOut className='mr-2 h-4 w-4' aria-hidden='true'/>
          Logout
        </div>
      </DropdownMenuItem>
  )
}