import React, { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import { useForm } from "react-hook-form";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import Logo from "@components/ui/logo";
import Seo from "@components/common/seo";

export default function LoginPage({ csrfToken }) {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ email }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/admin`
    );
    const result = await res.json();
    const users = result.data;
    const adminExits = users.find((user) => user.email === email);
    console.log(adminExits);
    if (adminExits) {
      await signIn("email", {
        email: email,
      });
    } else {
      setError(
        "You are not authorized to login, Contact your system administrator !"
      );
    }
  }

  return (
    <>
      <Seo
        title="Admin Sign In"
        description="Admin Dashboard"
        canonical="/auth/signin"
      />
      <div className="flex items-center justify-center h-screen bg-light ">
        <div className="m-auto max-w-md w-full bg-yellow/25 sm:shadow p-5 sm:p-8 rounded ">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h3 className="text-center text-cyan-700 text-lg font-semibold mb-4 mt-4">
            Sign In to Geenia Admin
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Input
              label="Email"
              type="email"
              variant="outline"
              className="mb-4"
              placeholder="Enter your email address"
              {...register("email", {
                required: "You must provide your email address !",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address !",
                },
              })}
              error={errors.email?.message}
            />

            <div className="relative">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full  px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
              >
                Sign In
              </button>
            </div>

            {error && (
              <Alert
                message={error}
                variant="error"
                closeable={true}
                className="mt-5"
                onClose={() => setError(null)}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const csrfToken = await getCsrfToken(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { csrfToken },
    };
  }
};
