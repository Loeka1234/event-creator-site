import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { withApollo } from "./../../../utils/withApollo";
import { Formik, Form } from "formik";
import InputField from "../../../components/InputField";
import { Button, Flex, Spinner } from "@chakra-ui/core";
import { useEventByIdQuery } from "../../../generated/graphql";
import { Wrapper } from "../../../components/Wrapper";
import { useUpdateEventMutation } from "./../../../generated/graphql";
import { EventForm } from "../../../components/dashboard/EventForm";

// TODO: fix backend for this
const Edit: NextPage = ({}) => {
	const router = useRouter();
	const { data, loading } = useEventByIdQuery({
		variables: { id: parseInt(router.query.id as string) },
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
					onSubmit={async data => {
						await updateEvent({
							variables: {
								title: data.title!,
								description: data.description,
								id: parseInt(router.query.id as string),
							},
						});
						router.push("/dashboard");
					}}
					buttonText="Edit Event"
					initialValues={{
						title: data?.eventById?.title || "",
						description: data?.eventById?.description || "",
						useMaxReservations: data?.eventById?.maxReservations
							? true
							: false,
						maxReservations: data?.eventById?.maxReservations || 10,
					}}
				/>
			</Wrapper>
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Edit);
