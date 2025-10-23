import React from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider> {/* Wrap children with TooltipProvider */}
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}