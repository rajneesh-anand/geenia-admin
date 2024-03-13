import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function SignInVerify() {
  return (
    <>
      <Seo
        title="Sign In Verify"
        description="Admin Dashboard"
        canonical="/auth/signin-verify"
      />
      <div className="flex items-center justify-center h-screen bg-light ">
        <div className="m-auto max-w-md w-full bg-yellow/25 sm:shadow p-5 sm:p-8 rounded">
        
          <h3 className="text-center text-green-700  mb-4 mt-4">
            Sign In link has been sent to your email address !
          </h3>
        </div>
      </div>
    </>
  );
}
