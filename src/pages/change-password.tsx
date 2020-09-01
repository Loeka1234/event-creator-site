import { NextPage } from "next";
import { LandingPageLayout } from "../layouts/LandingPageLayout";
import { useChangePasswordMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";

const changePassword: NextPage = () => {
	const [changePassword] = useChangePasswordMutation();
	const router = useRouter();
	console.log(router);
	return (
		<LandingPageLayout>
			<Wrapper variant="small">
				<Formik
					initialValues={{ newPassword: "" }}
					onSubmit={async ({ newPassword }) => {
						await changePassword({
							variables: {
								newPassword,
								token: router.query.token?.toString() || "",
							},
						});
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="newPassword"
								label="New Password"
								placeholder="new password"
							/>
							<Button
								type="submit"
								isLoading={isSubmitting}
								mt={2}
								variantColor="teal"
							>
								Change password
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</LandingPageLayout>
	);
};

export default withApollo({ ssr: false })(changePassword);
