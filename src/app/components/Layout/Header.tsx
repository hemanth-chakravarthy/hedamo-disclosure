import React from 'react';


export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900 text-white font-bold text-lg">
            H
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900 uppercase">
            Hedamo <span className="text-gray-600 font-normal ml-1">| Disclosure Portal</span>
          </span>
        </div>
        
        <nav className="flex items-center gap-6">
          <button className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Support
          </button>
          <div className="h-4 w-[1px] bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-200" />
            <span className="text-xs font-medium text-gray-900">Institutional User</span>
          </div>
        </nav>
      </div>
    </header>
  );
}