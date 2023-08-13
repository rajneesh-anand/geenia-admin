const OrderBox = ({ color, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      id="user"
      {...rest}
    >
      <path
        d="M 30.464 2 C 30.461 2.001 30.458 2.003 30.455 2.004 C 30.447 2.004 30.439 2.004 30.431 2.004 C 30.29 2.014 30.153 2.046 30.024 2.1 L 2.345 13.125 C 1.757 13.211 1.326 13.686 1.333 14.24 L 1.333 47.7 C 1.332 47.859 1.367 48.016 1.436 48.162 C 1.438 48.166 1.439 48.17 1.441 48.175 C 1.452 48.195 1.463 48.215 1.475 48.235 C 1.603 48.475 1.82 48.665 2.086 48.768 L 29.787 59.797 C 29.991 59.934 30.237 60.007 30.488 60.007 C 30.77 60.022 31.048 59.945 31.274 59.788 L 58.959 48.768 C 59.355 48.618 59.636 48.282 59.693 47.887 C 59.697 47.867 59.701 47.847 59.704 47.827 C 59.706 47.809 59.707 47.791 59.708 47.773 C 59.709 47.755 59.709 47.736 59.708 47.718 C 59.708 47.712 59.708 47.706 59.708 47.7 L 59.708 14.24 C 59.714 13.694 59.295 13.223 58.717 13.129 L 31.044 2.112 C 31.035 2.108 31.027 2.104 31.017 2.1 C 30.954 2.075 30.888 2.055 30.821 2.04 C 30.81 2.037 30.799 2.034 30.788 2.031 C 30.76 2.024 30.732 2.018 30.704 2.013 C 30.692 2.012 30.682 2.01 30.67 2.009 C 30.641 2.006 30.612 2.005 30.581 2.004 C 30.543 2.001 30.504 2 30.464 2 Z M 30.52 4.331 L 36.387 6.666 L 11.511 16.575 C 11.487 16.585 11.463 16.595 11.44 16.607 L 5.57 14.267 L 30.525 4.331 L 30.52 4.331 Z M 39.436 7.881 L 46.555 10.716 L 21.218 20.811 C 20.737 21.002 20.444 21.463 20.497 21.948 C 20.493 21.991 20.491 22.034 20.493 22.078 L 20.493 34.01 L 17.896 30.381 C 17.562 29.914 16.906 29.751 16.366 30.002 L 13.307 31.425 L 13.307 18.288 L 39.436 7.881 Z M 49.599 11.927 L 55.474 14.267 L 30.52 24.203 L 24.653 21.868 L 49.53 11.959 C 49.554 11.949 49.578 11.938 49.601 11.927 L 49.599 11.927 Z M 3.729 15.958 L 10.913 18.819 L 10.913 33.229 C 10.914 34.057 11.849 34.596 12.644 34.226 L 16.488 32.435 L 20.629 38.216 C 20.631 38.219 20.632 38.222 20.634 38.225 C 20.765 38.454 20.979 38.634 21.237 38.732 C 21.239 38.733 21.241 38.735 21.242 38.736 C 21.276 38.749 21.312 38.76 21.348 38.77 C 21.419 38.791 21.493 38.806 21.568 38.814 C 21.615 38.818 21.662 38.82 21.709 38.819 C 21.755 38.818 21.801 38.815 21.847 38.81 C 21.881 38.805 21.913 38.799 21.946 38.792 C 21.97 38.787 21.994 38.781 22.018 38.774 C 22.038 38.769 22.058 38.763 22.078 38.756 C 22.145 38.736 22.211 38.71 22.274 38.678 C 22.276 38.677 22.277 38.675 22.279 38.674 C 22.709 38.452 22.951 38.008 22.887 37.554 L 22.887 23.592 L 29.324 26.157 L 29.324 57.192 L 3.729 46.995 L 3.729 15.958 Z M 57.314 15.962 L 57.314 46.995 L 31.717 57.192 L 31.717 26.155 L 57.314 15.962 Z"
        color={color}
        fill={color}
      ></path>
    </svg>
  );
};

export default OrderBox;
