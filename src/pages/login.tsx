import { NextPage } from "next";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { LandingPageLayout } from "../layouts/LandingPageLayout";
import { withApollo } from "./../utils/withApollo";

const Login: NextPage = () => {
	const [login] = useLoginMutation();
	const router = useRouter();
	return (
		<LandingPageLayout>
			<Wrapper variant="small">
				<Formik
					initialValues={{ username: "", password: "" }}
					onSubmit={async (values, { setErrors }) => {
						const response = await login({
							variables: values,
							update: (cache, { data }) => {
								cache.writeQuery<MeQuery>({
									query: MeDocument,
									data: {
										__typename: "Query",
										me: data?.login.user,
									},
								});
							},
						});
						if (response.data?.login.error)
							setErrors(toErrorMap(response.data.login.error));
						else if (response.data?.login.user) router.push("/");
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="username"
								placeholder="username"
								label="Username"
							/>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							/>
							<Button
								type="submit"
								variantColor="teal"
								isLoading={isSubmitting}
								mt={4}
							>
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</LandingPageLayout>
	);
};

export default withApollo({ ssr: false })(Login);
