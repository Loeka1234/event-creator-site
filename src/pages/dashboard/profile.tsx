import { NextPage } from "next";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { withApollo } from "../../utils/withApollo";

const Profile: NextPage = () => {
	return (
		<DashboardLayout
			pages={[{ name: "Profile", path: "/dashboard/profile" }]}
		>
			<div>profile</div>
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Profile);
