import cn from "classnames";
import React, { useState } from "react";
import Eye from "@components/icons/eye-icon";
import EyeOff from "@components/icons/eye-off-icon";
import IconLockDots from "@components/icons/lockdot-icon";

const PasswordInput = React.forwardRef(
  (
    {
      className,
      label,
      error,
      placeholder,
      inputClassName,
      labelClassName,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      <>
        <div className={cn(className, "relative text-white-dark")}>
          {label && (
            <label
              htmlFor="password"
              className={cn(labelClassName, "relative text-white-dark")}
            >
              {label}
            </label>
          )}

          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            ref={ref}
            className="form-input ps-10 placeholder:text-white-dark"
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <span
            className="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="h-6 w-6" />
            ) : (
              <Eye className="h-6 w-6" />
            )}
          </span>
        </div>
        {error && <p className="text-[13px] text-rose-600">{error}</p>}
      </>
    );
  }
);

export default PasswordInput;
PasswordInput.displayName = "PasswordInput";
