'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';



export function LogoLg() {
  return (
    <Link href={'/'} className="flex gap-4 items-center">
      <div className="w-32 h-10 relative">
        <Image src={'/logo2.png'} alt={'logo-lg'} className="object-contain object-left" fill />
      </div>
    </Link>
  );
}

export function LogoSm() {
  return (
      <div className="w-8 h-8 mr-1 relative">
        <Image src={'/logo-sm.webp'} alt={'logo-sm'} className="object-contain object-left" fill />
      </div>
  );
}
