import { ReactNode } from "react";

type ContainerPropsT = {
  children: ReactNode;
  className?: string;
};
const Container = ({ children, className = "" }: ContainerPropsT) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

export default Container;
