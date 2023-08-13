import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import TextArea from "@components/ui/form/text-area";
import { useForm } from "react-hook-form";
import Seo from "@components/common/seo";

export default function NotificationPage() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ title, message }) {
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/message/post-message`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       method: "POST",
    //       body: JSON.stringify({ title: title, message: message }),
    //     }
    //   );
    //   const result = await res.json();
    //   if (res.status >= 400 && res.status < 600) {
    //     throw new Error(result.message);
    //   } else {
    //     setMessage("success");
    //     setError("Message sent successfully !");
    //   }
    // } catch (error) {
    //   setMessage("failed");
    //   setError(error.message);
    //   console.log(error.message);
    // }
  }

  return (
    <>
      <Seo
        title="Notification"
        description="Admin Dashboard"
        canonical="/notification"
      />
      <div className="mt-16">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col">
            <Input
              label="Notification Title"
              type="text"
              placeholder="write notification title here ..."
              className="mb-4"
              variant="outline"
              {...register("title", {
                required: "title required ! ",
              })}
              error={errors.title?.message}
            />

            <TextArea
              label="Notification Message"
              placeholder="write notification message here ..."
              className="mb-4"
              variant="outline"
              {...register("message")}
              error={errors.message?.message}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
          >
            Send Message
          </button>
        </form>
        {message === "failed" && (
          <Alert
            message={error}
            variant="error"
            closeable={true}
            className="my-2"
            onClose={() => setError(null)}
          />
        )}
        {message === "success" && (
          <Alert
            message={error}
            variant="success"
            closeable={true}
            className="my-2"
            onClose={() => setError(null)}
          />
        )}
      </div>
    </>
  );
}

NotificationPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
