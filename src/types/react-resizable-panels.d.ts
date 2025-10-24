import * as React from 'react';
import { PanelResizeHandleProps as OriginalPanelResizeHandleProps } from 'react-resizable-panels';

declare module 'react-resizable-panels' {
  // Augment the props interface for PanelResizeHandle
  // This tells TypeScript that PanelResizeHandleProps can also have a 'ref'
  interface PanelResizeHandleProps extends OriginalPanelResizeHandleProps, React.RefAttributes<HTMLDivElement> {}
}