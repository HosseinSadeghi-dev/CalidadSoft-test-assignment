import * as React from "react";
import styles from "./skeleton.module.scss";

interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      data-testid="skeleton"
      className={`bg-zinc-300 relative overflow-hidden rounded-lg ${className}`}
    >
      <div
        className={`${styles.skeleton} absolute top-0 right-0 bottom-0 left-0`}
      ></div>
    </div>
  );
};

export default Skeleton;
