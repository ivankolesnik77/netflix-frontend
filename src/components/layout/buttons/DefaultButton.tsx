import React from "react";
import classNames from "classnames";

const DefaultButton = ({
  id,
  className,
  onClick,
  disabled,
  value = "Submit",
  type = "button",
}: {
  className: string;
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
  type?: "button" | "submit";
}) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        "bg-red px-4 py-4 text-xl font-bold text-white hover:bg-blue-700",
        className,
      )}
    >
      {value}
    </button>
  );
};

export default DefaultButton;
