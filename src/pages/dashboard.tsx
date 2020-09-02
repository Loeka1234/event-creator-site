import { NextPage } from "next";
import { withApollo } from "../utils/withApollo";
import {
	Button,
	Box,
	Heading,
	IconButton,
	Flex,
	Stack,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	PopoverFooter,
} from "@chakra-ui/core";
import Link from "next/link";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useEventsQuery } from "../generated/graphql";
import { capitalizeFirstLetter } from "./../utils/capitalizeFirstLetter";
import { useDeleteEventMutation } from "./../generated/graphql";
import { useState } from "react";

const Dashboard: NextPage = () => {
	const { data, loading } = useEventsQuery();
	const [deleteEvent] = useDeleteEventMutation();
	const [openId, setOpenId] = useState<null | number>(null);

	return (
		<DashboardLayout pages={[]}>
			{!loading && data ? (
				<>
					<Heading mt={2}>Events</Heading>
					<Stack spacing={3} my={3}>
						{data.events.map(({ title, id }, i) => (
							<Flex
								key={id}
								borderWidth="1px"
								rounded="lg"
								p={2}
								maxW={600}
								justify="space-between"
								align="center"
								boxShadow="sm"
							>
								<Link href="/events/[id]" as={`/events/${id}`}>
									<Heading
										as="a"
										fontWeight={600}
										letterSpacing={-1}
										fontSize={28}
										isTruncated
										maxW={{ sm: "70%", md: "80%" }}
										cursor="pointer"
									>
										{capitalizeFirstLetter(title)}
									</Heading>
								</Link>
								<Box>
									<IconButton
										icon="edit"
										aria-label="Edit event"
									/>
									<Popover
										returnFocusOnClose={false}
										isOpen={openId === id}
										onClose={() => setOpenId(null)}
										placement="bottom"
										closeOnBlur={false}
									>
										<PopoverTrigger>
											<IconButton
												icon="delete"
												aria-label="Edit event"
												variantColor="red"
												ml={2}
												onClick={() => {
													setOpenId(id!);
												}}
											/>
										</PopoverTrigger>
										<PopoverContent zIndex={4}>
											<PopoverHeader fontWeight="semibold">
												Confirmation
											</PopoverHeader>
											<PopoverArrow />
											<PopoverCloseButton />
											<PopoverBody>
												Do you want to delete this
												event? This is an action that
												can't be undone.
											</PopoverBody>
											<PopoverFooter
												d="flex"
												justifyContent="flex-end"
											>
												<Button
													variantColor="red"
													onClick={async () => {
														await deleteEvent({
															variables: {
																id: id as number,
															},
															update: cache => {
																cache.modify({
																	id: cache.identify(
																		data
																			.events[
																			i
																		]
																	),
																	fields: {
																		id(
																			_,
																			{
																				DELETE,
																			}
																		) {
																			return DELETE;
																		},
																	},
																});
															},
														});
													}}
												>
													Delete
												</Button>
											</PopoverFooter>
										</PopoverContent>
									</Popover>
								</Box>
							</Flex>
						))}
					</Stack>
					<Link href="/dashboard/create">
						<Button as="a" variantColor="teal" cursor="pointer">
							Create event
						</Button>
					</Link>
				</>
			) : (
				<div>Loading</div>
			)}
		</DashboardLayout>
	);
};

export default withApollo({ ssr: false })(Dashboard);
