// components/Header.jsx (or .tsx if you're using TypeScript)

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons';
import { UserMenu } from '@/components/user-menu';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarToggle } from './sidebar-toggle';
import { ChatHistory } from './chat-history';
import { Session } from '@/lib/types';

async function UserOrLogin() {
  const session = (await auth()) as Session;
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}

export function Header() {
  return (
    <header style={{ backgroundColor: '#F0F7F4', border: 'none', outline: 'none' }} className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b-0">
      <div className="flex items-center">
        <Link href="/" legacyBehavior>
          <a style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginLeft: '10px', // Use camelCase for inline styles
            color: 'black',
            textDecoration: 'none', // Remove underline
            fontSize: '1.2em', // Adjust font size if needed
          }}>
            Acaceta
          </a>
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }), 'flex items-center justify-center')}
          style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'gray', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            outline: 'none', 
            boxShadow: 'none' 
          }}
        >
          <span>Account</span>
        </a>
      </div>
    </header>
  );
}
