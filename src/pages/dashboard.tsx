import { NextPage } from "next";
import { withApollo } from "../utils/withApollo";
import { Button } from "@chakra-ui/core";
import Link from "next/link";
import { DashboardLayout } from "../layouts/DashboardLayout";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout pages={[{ name: "Dashboard", path: "/dashboard" }]}>
      <Link href="/dashboard/create">
        <Button as="a" variantColor="teal" cursor="pointer">
          Create event
        </Button>
      </Link>
    </DashboardLayout>
  );
};

export default withApollo({ ssr: false })(Dashboard);
