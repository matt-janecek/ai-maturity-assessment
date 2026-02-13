'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/submissions', label: 'Submissions', icon: '📋' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  { href: '/admin/help', label: 'Help', icon: '❓' },
]

export function AdminNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="w-64 bg-donyati-black text-white min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-donyati-purple">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-donyati-lime text-2xl font-bold">Donyati</span>
        </Link>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-donyati-purple text-white'
                      : 'text-gray-300 hover:bg-donyati-dark-purple hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Sign Out */}
      <div className="p-4 border-t border-donyati-purple">
        {session?.user && (
          <div className="mb-3">
            <p className="text-sm text-gray-300 truncate">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-donyati-dark-purple text-white rounded-lg hover:bg-donyati-purple transition-colors"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
