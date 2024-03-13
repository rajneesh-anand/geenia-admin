import React from "react";
const Description = ({ title, details, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {title && <h4 className="text-slate-700 font-semibold mb-2">{title}</h4>}
      {details && <p className="text-sm text-slate-500">{details}</p>}
    </div>
  );
};

export default Description;
