import { NextPage } from "next";
import { withApollo } from "../utils/withApollo";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Events } from "../components/dashboard/Events";

const Dashboard: NextPage = () => {
	return (
		<DashboardLayout pages={[]}>
			<Events />
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Dashboard);
