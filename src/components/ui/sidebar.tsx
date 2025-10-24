"use client"

import * as React from "react"
import { PanelLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet" // Removed SheetTrigger as it's not directly used here
import { Button } from "@/components/ui/button"

const SidebarContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
  isMobile: boolean
}>({
  open: true,
  setOpen: () => true,
  openMobile: false,
  setOpenMobile: () => true,
  toggleSidebar: () => null,
  isMobile: false,
})

const Sidebar = ({
  children,
  className,
  defaultOpen = true,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { defaultOpen?: boolean }) => {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((openState: boolean) => !openState) : setOpen((openState: boolean) => !openState)
  }, [isMobile, setOpen, setOpenMobile])

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, openMobile, setOpenMobile, toggleSidebar, isMobile }}
    >
      <aside
        className={cn(
          "flex h-full",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  )
}
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = React.useContext(SidebarContext)
  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn("size-7", className)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarContent = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { open, openMobile, isMobile, setOpenMobile } = React.useContext(SidebarContext)

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="pr-0 w-3/4 sm:max-w-sm"> {/* Removed size="content" and added w-3/4 sm:max-w-sm */}
          <div className={cn("h-full", className)} {...props}>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "h-full w-64 shrink-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:-translate-x-full",
        open ? "translate-x-0" : "-translate-x-full",
        "transition-transform duration-200 ease-in-out",
        className
      )}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  )
}
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn(
      "flex h-14 items-center border-b px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn(
      "flex h-14 items-center border-t px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"h4">
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
))
SidebarTitle.displayName = "SidebarTitle"

const SidebarDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SidebarDescription.displayName = "SidebarDescription"

const SidebarNav = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) => (
  <nav className={cn("flex-1 overflow-auto p-4", className)} {...props}>
    {children}
  </nav>
)
SidebarNav.displayName = "SidebarNav"

const SidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    active?: boolean
    icon?: React.ReactNode
  }
>(({ className, active, icon, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
      active && "bg-accent text-accent-foreground",
      className
    )}
    {...props}
  >
    {icon && <span className="size-5">{icon}</span>}
    <span>{children}</span>
  </a>
))
SidebarNavLink.displayName = "SidebarNavLink"

export {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTitle,
  SidebarDescription,
  SidebarNav,
  SidebarNavLink,
}