import { CSSProperties, ReactNode } from 'react';

interface Props {
  id?: string;
  text: string;
  icon: ReactNode;
  style?: CSSProperties;
}

const IconicText = ({ id, text, icon, style }: Props) => {
  return (
    <div id={id} style={{ display: 'flex', alignItems: 'center', ...style }}>
      <span
        id={`${id}--icon`}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 4,
          marginRight: 4,
        }}
        aria-labelledby={`${id}--text`}
      >
        {icon}
      </span>
      <span id={`${id}--text`}>{text}</span>
    </div>
  );
};

export default IconicText;
