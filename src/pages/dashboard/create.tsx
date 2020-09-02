import { NextPage } from "next";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { withApollo } from "../../utils/withApollo";
import { Formik, Form } from "formik";
import InputField from "../../components/InputField";
import { Button } from "@chakra-ui/core";
import { Wrapper } from "../../components/Wrapper";
import {
	useCreateEventMutation,
	EventsQuery,
	EventsDocument,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";

const Create: NextPage = () => {
	const [createEvent] = useCreateEventMutation();
	const router = useRouter();
	return (
		<DashboardLayout
			pages={[{ name: "Create Event", path: "/dashboard/create" }]}
		>
			<Wrapper variant="small">
				<Formik
					initialValues={{ title: "", description: "" }}
					onSubmit={async (values, { setErrors }) => {
						const { data } = await createEvent({
							variables: values,
							update: (cache, { data: _data }) => {
								const otherEvents = cache.readQuery<
									EventsQuery
								>({
									query: EventsDocument,
								});
								cache.writeQuery<EventsQuery>({
									query: EventsDocument,
									data: {
										__typename: "Query",
										events: [
											...(otherEvents?.events as any),
											_data?.createEvent.event,
										],
									},
								});
							},
						});
						if (data?.createEvent.error)
							setErrors(toErrorMap(data.createEvent.error));
						else router.push("/dashboard");
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="title"
								label="Title*"
								placeholder="title"
							/>
							<InputField
								name="description"
								label="Description"
								placeholder="description"
							/>
							<Button
								type="submit"
								variantColor="teal"
								mt={2}
								isLoading={isSubmitting}
							>
								Create Event
							</Button>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Create);
