import { NextPage } from "next";
import { useForgotPasswordMutation } from "../generated/graphql";
import { LandingPageLayout } from "../layouts/LandingPageLayout";
import { withApollo } from "../utils/withApollo";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";

const ForgotPassword: NextPage = () => {
	const [forgotPassword] = useForgotPasswordMutation();

	return (
		<LandingPageLayout>
			<Wrapper variant="small">
				<Formik
					initialValues={{ email: "" }}
					onSubmit={async values => {
						await forgotPassword({ variables: values });
						// TODO: show message
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="email"
								label="Email"
								placeholder="email"
								type="email"
							/>

							<Button type="submit" isLoading={isSubmitting}>
								Reset password
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</LandingPageLayout>
	);
};

export default withApollo({ ssr: false })(ForgotPassword);
