import 'react-resizable-panels';

declare module 'react-resizable-panels' {
  interface PanelResizeHandleProps {
    ref?: React.Ref<HTMLDivElement>;
  }
}