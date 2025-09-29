import React, { ReactNode } from 'react';

type IContentProps = {
  children: ReactNode;
};

const Content = (props: IContentProps) => (
  <div className="content sun-editor-editable">{props.children}</div>
);

export { Content };
