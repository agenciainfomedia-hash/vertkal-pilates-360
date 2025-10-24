import * as React from 'react';

declare module 'react-resizable-panels' {
  // Augment the props interface for PanelResizeHandle
  // This tells TypeScript that PanelResizeHandleProps can also have a 'ref'
  interface PanelResizeHandleProps extends React.RefAttributes<HTMLDivElement> {}
}