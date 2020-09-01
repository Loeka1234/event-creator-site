import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { LandingPageLayout } from "../layouts/LandingPageLayout";
import { withApollo } from "./../utils/withApollo";

const Register: NextPage = () => {
	const [register] = useRegisterMutation();
	const router = useRouter();
	return (
		<LandingPageLayout>
			<Wrapper variant="small">
				<Formik
					initialValues={{ username: "", email: "", password: "" }}
					onSubmit={async (values, { setErrors }) => {
						const response = await register({
							variables: values,
							update: (cache, { data }) => {
								cache.writeQuery<MeQuery>({
									query: MeDocument,
									data: {
										__typename: "Query",
										me: data?.register.user,
									},
								});
							},
						});
						if (response.data?.register.error)
							setErrors(toErrorMap(response.data.register.error));
						else if (response.data?.register.user) router.push("/");
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
								name="email"
								placeholder="email"
								label="Email"
								type="email"
							/>
							<Box mt={4}>
								<InputField
									name="password"
									placeholder="password"
									label="Password"
									type="password"
								/>
							</Box>
							<Button
								mt={4}
								type="submit"
								variantColor="teal"
								isLoading={isSubmitting}
							>
								Register
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</LandingPageLayout>
	);
};

export default withApollo({ ssr: false })(Register);
