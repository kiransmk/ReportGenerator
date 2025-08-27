import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";

type IconButtonPropsT = {
  children: ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonPropsT>(
  ({ children, onClick, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="disabled:opacity-25"
        {...rest}
      >
        {children}
      </button>
    );
  }
);

// Create a higher-order component (HOC) that wraps IconButton
const withCircleIconButton = <P extends IconButtonPropsT>(
  WrappedComponent: React.ComponentType<P>
) => {
  return forwardRef<HTMLButtonElement, P>((props, ref) => {
    return (
      <div className="absolute top-0 right-6 h-[44px] w-[44px] border-2 border-gray-500 text-gray-500 rounded-full flex justify-center items-center">
        <WrappedComponent {...props} ref={ref} />
      </div>
    );
  });
};

export const CircleIconButton = withCircleIconButton(IconButton);
