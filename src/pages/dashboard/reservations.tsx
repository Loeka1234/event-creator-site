import { NextPage } from "next";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { withApollo } from "./../../utils/withApollo";
import { usePaginatedReservationsQuery } from "./../../generated/graphql";
import { Text, Stack, Heading, Box, Button } from "@chakra-ui/core";

const Reservations: NextPage = () => {
	const {
		data,
		error,
		loading,
		fetchMore,
		variables,
	} = usePaginatedReservationsQuery({
		variables: {
			limit: 10,
			cursor: null,
		},
		notifyOnNetworkStatusChange: true,
	});

	console.log("hasmore: ", data?.paginatedReservations.hasMore);

	return (
		<DashboardLayout
			pages={[{ name: "Reservations", path: "/dashboard/reservations" }]}
		>
			{error ? (
				<Text>Query failed.</Text>
			) : !data && loading ? (
				<Text>Loading...</Text>
			) : (
				<>
					<Stack spacing={2} mt={2}>
						{data?.paginatedReservations.reservations.map(
							({ name, id }) => (
								<Box key={id} borderWidth="1px" rounded="lg" boxShadow="sm">
									<Heading>{name}</Heading>
								</Box>
							)
						)}
					</Stack>
					{data?.paginatedReservations.hasMore && (
						<Button
							onClick={async () => {
								const a = await fetchMore({
									variables: {
										limit: variables?.limit,
										cursor:
											data.paginatedReservations
												.reservations[
												data.paginatedReservations
													.reservations.length - 1
											].createdAt,
                                    },
                                });
                                console.log(a)
							}}
							isLoading={loading}
						>
							More Reservations
						</Button>
					)}
				</>
			)}
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Reservations);
