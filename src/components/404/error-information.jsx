const ErrorInformation = () => {
  return (
    <div className="flex justifify-center items-center h-[400px]">
      <h2 className="text-3xl  2xl:text-6xl font-bold  pt-5 xl:pt-9">
        Page Not Found
      </h2>
      <p className="text-15px md:text-base 2xl:text-[18px] leading-7 md:leading-8 pt-4 font-medium">
        We're sorry! This page is currently unavailable. We request you to
        please try again later
      </p>
    </div>
  );
};

export default ErrorInformation;
