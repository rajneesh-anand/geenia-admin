import Layout from "@components/layout";
import RewardCalculation from "@components/reward/reward-calculation";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export default function CalculationPage() {
  return (
    <>
      <Seo
        title="Reward Calculation"
        description="Admin Dashboard"
        canonical="calculation"
      />
      <RewardCalculation />
    </>
  );
}

CalculationPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
