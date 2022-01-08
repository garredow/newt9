import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';

type Props = ComponentBaseProps &
  React.HTMLAttributes<HTMLDivElement> & {
    rootClassName?: string;
  };

export const Component = React.forwardRef((props: Props, ref: any) => (
  <div
    // {...props}
    ref={ref}
    className={joinClasses(props.rootClassName, props.className)}
    style={props.style}
    title={props.title}
    contentEditable={props.contentEditable}
    suppressContentEditableWarning={true}
    spellCheck={false}
    onClick={props.onClick}
    onContextMenu={props.onContextMenu}
    onKeyDown={props.onKeyDown}
    onBlur={props.onBlur}
    data-testid={props['data-testid']}
  >
    {props.children}
  </div>
));

// export function Component(props: Props) {
//   return (
//     <div
//       // {...props}
//       className={joinClasses(props.rootClassName, props.className)}
//       style={props.style}
//       title={props.title}
//       suppressContentEditableWarning={true}
//       spellCheck={false}
//       onClick={props.onClick}
//       onContextMenu={props.onContextMenu}
//       onKeyDown={props.onKeyDown}
//       onBlur={props.onBlur}
//       data-testid={props['data-testid']}
//     >
//       {props.children}
//     </div>
//   );
// }
