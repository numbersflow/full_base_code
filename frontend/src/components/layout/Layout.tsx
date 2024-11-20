import React from 'react'
import { Navbar } from '@/components/ui/navigation/Navbar'
import { Container } from '@/components/ui/layout/Container'
import { Button } from '@/components/ui/buttons/Button'
import { ThemeToggle } from '@/components/ui/theme/ThemeToggle'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar className="border-b">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold">UI Showcase</Link>
            <div className="flex items-center space-x-4">
              <Link href="/features"><Button variant="ghost">Features</Button></Link>
              <Link href="/pricing"><Button variant="ghost">Pricing</Button></Link>
              <Link href="/about"><Button variant="ghost">About</Button></Link>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </Navbar>

      <main>{children}</main>

      <footer className="bg-muted mt-20">
        <Container>
          <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:underline">Features</Link></li>
                <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
                <li><Link href="#" className="hover:underline">Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="#" className="hover:underline">Blog</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Community</Link></li>
                <li><Link href="#" className="hover:underline">Help Center</Link></li>
                <li><Link href="#" className="hover:underline">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Privacy</Link></li>
                <li><Link href="#" className="hover:underline">Terms</Link></li>
                <li><Link href="#" className="hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="py-6 text-center border-t">
            <p>&copy; 2024 UI Showcase. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}