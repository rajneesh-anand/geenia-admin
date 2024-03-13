import cn from "classnames";
import React from "react";
import IconMail from "@components/icons/mail-icon";

const EmailInput = React.forwardRef(
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
    return (
      <>
        <div className={cn(className, "relative text-white-dark")}>
          {label && (
            <label
              htmlFor="email"
              className={cn(labelClassName, "relative text-white-dark")}
            >
              {label}
            </label>
          )}

          <input
            id="email"
            name="email"
            type="email"
            ref={ref}
            className="form-input ps-10 placeholder:text-white-dark"
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
        {error && <p className="text-[13px] text-rose-600">{error}</p>}
      </>
    );
  }
);

export default EmailInput;
