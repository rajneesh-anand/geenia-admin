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

  async function onSubmit({ title, msgDescription }) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/message/topic`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ title: title, message: msgDescription }),
        }
      );
      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setError("Message sent successfully !");
      }
    } catch (error) {
      setMessage("failed");
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <>
      <Seo
        title="Notification"
        description="Admin Dashboard"
        canonical="notification"
      />
      <div className="mt-1">
        {error && (
          <Alert
            message={error}
            variant={message}
            closeable={true}
            className="my-3"
            onClose={() => setError(null)}
          />
        )}
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
              {...register("msgDescription", {
                required: "message is required ! ",
              })}
              error={errors.msgDescription?.message}
            />
          </div>
          <div className="relative mt-4 text-center lg:text-end">
            <button
              type="submit"
              className="whitespace-no-wrap rounded-sm bg-orange-500 px-4 py-1 text-base font-medium leading-6 text-white shadow-sm hover:bg-opacity-90 focus:outline-none"
            >
              Send Message
            </button>
          </div>
        </form>
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
