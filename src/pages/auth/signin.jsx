import React, { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import EmailInput from "@components/ui/form/email-input";
import { useForm } from "react-hook-form";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import PasswordInput from "@components/ui/form/password-input";
import { useRouter } from "next/router";
import Seo from "@components/common/seo";

export default function LoginPage({ csrfToken }) {
  const [alertType, setAlertType] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ email, password }) {
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      console.log(result.error);
      setAlertType("error");
      setMessage(result?.error);
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <Seo
        title="Admin Sign In"
        description="Admin Dashboard"
        canonical="/auth/signin"
      />

      <div>
        <div className="absolute inset-0">
          <img
            src="/images/hero/bg-gradient.png"
            alt="image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative flex min-h-screen items-center justify-center bg-[url(/images/hero/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
          <img
            src="/images/hero/coming-soon-object1.png"
            alt="image"
            className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
          />
          <img
            src="/images/hero/coming-soon-object2.png"
            alt="image"
            className="absolute left-24 top-0 h-40 md:left-[30%]"
          />
          <img
            src="/images/hero/coming-soon-object3.png"
            alt="image"
            className="absolute right-0 top-0 h-[300px]"
          />
          <img
            src="/images/hero/polygon-object.svg"
            alt="image"
            className="absolute bottom-0 end-[28%]"
          />
          <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
            <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[400px]">
              <div className="mx-auto w-full max-w-[440px]">
                <div className="mb-10">
                  <div className="flex items-center ">
                    <img
                      className="inline w-24 md:w-32  ltr:-ml-1 rtl:-mr-1"
                      src="/images/logo.svg"
                      alt="logo"
                    />
                    <h1 className="ml-2 text-xl font-bold uppercase !leading-snug text-primary md:ml-4 md:text-3xl md:font-extrabold">
                      Admin Sign In
                    </h1>
                  </div>

                  <p className="text-[14px] font-medium leading-normal text-white-dark md:text-base md:font-bold">
                    Sign In using administrator login credentials
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3"
                  noValidate
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />

                  <EmailInput
                    className="mt-2"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email address is required !",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address format !",
                      },
                    })}
                    error={errors.email?.message}
                  />

                  <PasswordInput
                    className="mb-4"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required !",
                    })}
                    error={errors.password?.message}
                  />

                  <button
                    type="submit"
                    className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                  >
                    Sign In
                  </button>
                </form>
                {alertType && (
                  <Alert
                    message={message}
                    variant={alertType}
                    closeable={true}
                    className="mt-5"
                    onClose={() => setMessage(null)}
                  />
                )}
              </div>
            </div>
          </div>
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
