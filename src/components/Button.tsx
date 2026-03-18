import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  tintShadow?: boolean;
  isLoading?: boolean;
  progress?: number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  tintShadow = false,
  isLoading = false,
  progress = 0,
  disabled,
  className = "",
  ...props
}) => {
  const baseClass = "figma-button";
  const shadowClass = tintShadow ? "has-tint-shadow" : "";
  const loadingClass = isLoading ? "is-loading" : "";

  return (
    <button
      className={`${baseClass} ${shadowClass} ${loadingClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? `Loading... ${progress}%` : children}
    </button>
  );
};
