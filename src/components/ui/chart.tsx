"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: { color: CSS_VAR_NAME, ... } }
type ChartConfig = {
  [k: string]: {
    label?: string
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> // Corrected icon type
  } & (
    | { color?: string; light?: string }
    | { [k: string]: string | undefined }
  )
}

type ChartContextProps = {
  config: ChartConfig
  children: React.ReactNode
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ config, className, children, ...props }, ref) => {
  const id = React.useId()
  return (
    <ChartContext.Provider value={{ config, children }}>
      <div
        ref={ref}
        id={id}
        className={cn(
          "flex aspect-video justify-center text-foreground",
          className
        )}
        {...props}
      />
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideIndicator?: boolean
    indicator?: "dot" | "line"
    index?: number
    payload?: RechartsPrimitive.TooltipProps<any, any>["payload"]
    label?: RechartsPrimitive.TooltipProps<any, any>["label"]
    valueFormatter?: (value: any, name: string, item: any, index: number) => React.ReactNode
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode
    nameKey?: string
  }
>(
  (
    {
      className,
      hideIndicator = false,
      indicator = "dot",
      index,
      payload,
      label,
      valueFormatter,
      labelFormatter,
      nameKey,
      ...props
    },
    ref
  ) => {
    const { config } = useChart()
    const customLabel = labelFormatter ? labelFormatter(label, payload || []) : label;

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid overflow-hidden rounded-md border border-border bg-popover p-2 text-sm shadow-md",
          className
        )}
        {...props}
      >
        {customLabel && (
          <div className="border-b border-border pb-2 text-center font-medium">
            {customLabel}
          </div>
        )}
        <div className="grid gap-1.5 pt-2">
          {payload.map((item: any, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = config[key]

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex items-center justify-between gap-4",
                  itemConfig?.color && `text-${itemConfig.color}`
                )}
              >
                {itemConfig?.icon && (
                  <itemConfig.icon className="h-3 w-3" />
                )}
                <div className="flex flex-1 justify-between">
                  {itemConfig?.label ? itemConfig.label : item.name}
                  {valueFormatter ? (
                    valueFormatter(item.value, item.name, item, index)
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Tooltip> & {
    hideIndicator?: boolean
    indicator?: "dot" | "line"
    nameKey?: string
    valueFormatter?: (value: any, name: string, item: any, index: number) => React.ReactNode
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode
    className?: string; // Added className prop here
  }
>(
  (
    {
      className,
      content,
      hideIndicator,
      indicator,
      nameKey,
      valueFormatter,
      labelFormatter,
      ...props
    },
    ref
  ) => {
    return (
      <RechartsPrimitive.Tooltip
        cursor={{ stroke: "#1A1A1A", strokeWidth: 1 }}
        content={({ payload, label, active }) => {
          if (active && payload && payload.length) {
            return (
              <ChartTooltip
                ref={ref}
                payload={payload}
                label={label}
                hideIndicator={hideIndicator}
                indicator={indicator}
                nameKey={nameKey}
                valueFormatter={valueFormatter}
                labelFormatter={labelFormatter}
                className={className} // Pass className to ChartTooltip
              />
            )
          }

          return null
        }}
        {...props}
      />
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart }