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
import { EventForm } from "../../components/dashboard/EventForm";

const Create: NextPage = () => {
	const [createEvent] = useCreateEventMutation();
	const router = useRouter();
	return (
		<DashboardLayout
			pages={[{ name: "Create Event", path: "/dashboard/create" }]}
		>
			<Wrapper variant="small">
				<EventForm
					buttonText="Create Event"
					onSubmit={async (
						{ useMaxReservations: _, ...values },
						{ setErrors }
					) => {
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
				/>
			</Wrapper>
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Create);
