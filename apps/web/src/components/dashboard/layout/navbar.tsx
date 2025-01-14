"use client"
import { ModeToggle } from "@/components/dashboard/layout/mode-toggle";
// import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/dashboard/layout/sheet-menu";
import { UserAccount } from '@/components/dashboard/layout/user-account';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { AccountSkeleton } from '@/components/dashboard/layout/account-skeleton';
import { useUser } from '@/components/dashboard/layout/user-context';

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const {user, loading} = useUser();

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          {/*<UserNav />*/}
            {loading ? (
              <AccountSkeleton />
            ) : user ? (
              <>
                <UserAccount user={user} />
              </>
            ) : (
              <Link href="/auth/sign-in">
                <Button>
                  Sign In
                </Button>
              </Link>
            )}
        </div>
      </div>
    </header>
  );
}