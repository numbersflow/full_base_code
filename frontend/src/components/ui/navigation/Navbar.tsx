import * as React from "react"
import { cn } from "@/lib/utils"

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("bg-background flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    />
  )
)
Navbar.displayName = "Navbar"

const NavbarBrand = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("text-xl font-bold", className)}
    {...props}
  />
))
NavbarBrand.displayName = "NavbarBrand"

const NavbarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-4", className)}
    {...props}
  />
))
NavbarContent.displayName = "NavbarContent"

const NavbarItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("list-none", className)}
    {...props}
  />
))
NavbarItem.displayName = "NavbarItem"

const NavbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
      className
    )}
    {...props}
  />
))
NavbarLink.displayName = "NavbarLink"

export { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarLink }