"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import { PanelGroup, Panel, PanelResizeHandle, PanelResizeHandleProps } from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroupComponent = PanelGroup
const ResizablePanelComponent = Panel

// Define the props for our wrapper component
interface ResizableHandleProps extends PanelResizeHandleProps {
  withHandle?: boolean;
}

const ResizableHandleComponent = React.forwardRef<
  HTMLDivElement, // Ref for the underlying DOM element
  ResizableHandleProps // Props for our component
>(({ withHandle, className, ...props }, ref) => {
  // Explicitly cast PanelResizeHandle to a type that includes ref.
  // This ensures TypeScript recognizes 'ref' when passed to PanelResizeHandle.
  const TypedPanelResizeHandle = PanelResizeHandle as React.ComponentType<
    PanelResizeHandleProps & React.RefAttributes<HTMLDivElement>
  >;

  return (
    <TypedPanelResizeHandle
      ref={ref} // This line will now correctly recognize the 'ref' prop
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVerticalIcon className="h-2.5 w-2.5" />
        </div>
      )}
    </TypedPanelResizeHandle>
  );
});
ResizableHandleComponent.displayName = "ResizableHandle"

export {
  ResizablePanelGroupComponent as ResizablePanelGroup,
  ResizablePanelComponent as ResizablePanel,
  ResizableHandleComponent as ResizableHandle,
}