import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { withApollo } from "./../../../utils/withApollo";
import { Flex, Spinner } from "@chakra-ui/core";
import { useEventByIdQuery } from "../../../generated/graphql";
import { Wrapper } from "../../../components/Wrapper";
import { useUpdateEventMutation } from "./../../../generated/graphql";
import { EventForm } from "../../../components/dashboard/EventForm";
import { isNullOrUndefined } from "util";

const Edit: NextPage = ({}) => {
	const router = useRouter();
	const { data, loading } = useEventByIdQuery({
		variables: { id: parseInt(router.query.id as string) },
		fetchPolicy: "network-only",
	});
	const [updateEvent] = useUpdateEventMutation();

	return loading ? (
		<Flex justify="center" minH="80vh" align="center">
			<Spinner size="xl" />
		</Flex>
	) : (
		<DashboardLayout
			pages={[
				{
					name: "Edit Post",
					path: `/dashboard/edit/${router.query.id}`,
				},
			]}
		>
			<Wrapper variant="small">
				<EventForm
					initialValues={{
						title: data?.eventById?.title || "",
						description: data?.eventById?.description || "",
						useMaxReservations: data?.eventById?.maxReservations
							? true
							: false,
						maxReservations: data?.eventById?.maxReservations || 10,
						startDate: data?.eventById?.startDate
							? data.eventById.startDate
							: Date.now(),
						useEndDate: !isNullOrUndefined(
							data?.eventById?.endDate
						),
						endDate:
							typeof data?.eventById?.endDate !== "undefined"
								? data.eventById.endDate
								: null,
					}}
					onSubmit={async ({ useEndDate, endDate, ...data }) => {
						console.log(useEndDate, endDate, data);
						await updateEvent({
							variables: {
								title: data.title!,
								description: data.description,
								id: parseInt(router.query.id as string),
								maxReservations: data.useMaxReservations
									? data.maxReservations
									: null,
								useEndDate,
								endDate,
							},
						});
						router.push("/dashboard");
					}}
					buttonText="Edit Event"
				/>
			</Wrapper>
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Edit);
