import React from "react";

const ThemeIcon = ({
  fill = "currentColor",
  dark,
  size,
  height,
  width,
  label,
  ...props
}: {
  fill?: string;
  dark: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill={fill} d={dark ? "M18 12a6 6 0 11-12 0 6 6 0 0112 0z" : "M12 22c5.523 0 10-4.477 10-10 0-.463-.694-.54-.933-.143a6.5 6.5 0 11-8.924-8.924C12.54 2.693 12.463 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10z"}></path>
      <path
        fill={dark ? "currentColor" : "none"}
        fillRule="evenodd"
        d="M12 1.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM4.399 4.399a.75.75 0 011.06 0l.393.392a.75.75 0 01-1.06 1.061l-.393-.393a.75.75 0 010-1.06zm15.202 0a.75.75 0 010 1.06l-.393.393a.75.75 0 01-1.06-1.06l.393-.393a.75.75 0 011.06 0zM1.25 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zm19 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-2.102 6.148a.75.75 0 011.06 0l.393.393a.75.75 0 11-1.06 1.06l-.393-.393a.75.75 0 010-1.06zm-12.296 0a.75.75 0 010 1.06l-.393.393a.75.75 0 11-1.06-1.06l.392-.393a.75.75 0 011.061 0zM12 20.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ThemeIcon;