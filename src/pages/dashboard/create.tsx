import { NextPage } from "next";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { withApollo } from "../../utils/withApollo";
import { Wrapper } from "../../components/Wrapper";
import {
	useCreateEventMutation,
	EventsQuery,
	EventsDocument,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { EventForm } from "../../components/dashboard/EventForm";
import { useToast } from "@chakra-ui/core";

const Create: NextPage = () => {
	const [createEvent] = useCreateEventMutation();
	const router = useRouter();
	const toast = useToast();

	return (
		<DashboardLayout
			pages={[{ name: "Create Event", path: "/dashboard/create" }]}
		>
			<Wrapper variant="small">
				<EventForm
					buttonText="Create Event"
					onSubmit={async (
						{ useMaxReservations: _, useEndDate, ...values },
						{ setErrors }
					) => {
						const { data } = await createEvent({
							variables: {
								...values,
								startDate: values.startDate,
								endDate: useEndDate ? values.endDate : null,
							},
							update: (cache, { data: _data }) => {
								let otherEvents;
								try {
									otherEvents = cache.readQuery<EventsQuery>({
										query: EventsDocument,
									});
								} catch (err) {
									console.log(err);
								} finally {
									cache.writeQuery<EventsQuery>({
										query: EventsDocument,
										data: {
											__typename: "Query",
											events: [
												...((otherEvents?.events as any) ||
													undefined),
												_data?.createEvent.event,
											],
										},
									});
								}
							},
						});

						if (data?.createEvent.error) {
							if (
								data.createEvent.error.field === "startDate" ||
								data.createEvent.error.field === "endDate"
							)
								toast({
									title: "An error occurred.",
									description: data.createEvent.error.message,
									status: "error",
									duration: 9000,
									isClosable: true,
								});
							setErrors(toErrorMap(data.createEvent.error));
						} else router.push("/dashboard");
					}}
				/>
			</Wrapper>
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Create);
