import {
	Button,
	Box,
	Heading,
	IconButton,
	Flex,
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	PopoverFooter,
	Spinner,
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionPanel,
	AccordionIcon,
	Link,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import {
	useEventsQuery,
	useDeleteEventMutation,
} from "../../generated/graphql";
import { useState } from "react";

export interface EventsProps {}

export const Events: React.FC<EventsProps> = ({}) => {
	const { data, loading } = useEventsQuery();
	const [deleteEvent] = useDeleteEventMutation();
	const [openId, setOpenId] = useState<null | number>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	return (
		<Box maxW={600} width="100%">
			{!loading && data ? (
				<>
					<Heading mt={2}>Events</Heading>
					<Accordion my={3} allowMultiple>
						{data.events.map(
							(
								{
									title,
									id,
									description,
									amountReservations,
									maxReservations,
								},
								i
							) => (
								<AccordionItem
									key={id}
									rounded="lg"
									borderWidth="1px"
									boxShadow="sm"
									my={4}
									width="100%"
								>
									<AccordionHeader
										as="div"
										_focus={{
											boxShadow: "none",
										}}
									>
										<Flex
											justify="space-between"
											align="center"
											width="100%"
										>
											<Heading
												as="a"
												fontWeight={600}
												letterSpacing={-1}
												fontSize={28}
												isTruncated
												flex={1}
												textAlign="left"
												cursor="pointer"
												mr={1}
											>
												{capitalizeFirstLetter(title)}
											</Heading>
											<Box>
												<NextLink
													href="/dashboard/edit/[id]"
													as={`/dashboard/edit/${id}`}
												>
													<IconButton
														icon="edit"
														aria-label="Edit event"
														as="a"
														cursor="pointer"
														onClick={e =>
															e.stopPropagation()
														}
													/>
												</NextLink>
												<Popover
													returnFocusOnClose={false}
													isOpen={openId === id}
													onClose={() =>
														setOpenId(null)
													}
													placement="bottom"
													closeOnBlur={false}
												>
													<PopoverTrigger>
														<IconButton
															icon="delete"
															aria-label="Edit event"
															variantColor="red"
															ml={2}
															onClick={e => {
																e.stopPropagation();
																setOpenId(id!);
															}}
														/>
													</PopoverTrigger>
													<PopoverContent zIndex={4}>
														<PopoverHeader fontWeight="semibold">
															Confirmation
														</PopoverHeader>
														<PopoverArrow />
														<PopoverCloseButton
															onClick={(e: any) =>
																e.stopPropagation()
															}
														/>
														<PopoverBody>
															Do you want to
															delete this event?
															This is an action
															that can't be
															undone.
														</PopoverBody>
														<PopoverFooter
															d="flex"
															justifyContent="flex-end"
														>
															<Button
																isLoading={
																	deleteLoading
																}
																variantColor="red"
																onClick={async () => {
																	setDeleteLoading(
																		true
																	);
																	await deleteEvent(
																		{
																			variables: {
																				id: id as number,
																			},
																			update: cache => {
																				cache.modify(
																					{
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
																					}
																				);
																			},
																		}
																	);
																	setDeleteLoading(
																		false
																	);
																}}
															>
																Delete
															</Button>
														</PopoverFooter>
													</PopoverContent>
												</Popover>
												<AccordionIcon
													size="30px"
													ml={3}
													cursor="pointer"
												/>
											</Box>
										</Flex>
									</AccordionHeader>
									<AccordionPanel>
										<Text>{description}</Text>
										<Text>
											Link:{" "}
											<NextLink
												href="/events/[id]"
												as={`/events/${id}`}
											>
												<Link textDecor="underline">
													{
														process.env
															.NEXT_PUBLIC_DOMAIN
													}
													/events/{id}
												</Link>
											</NextLink>
										</Text>
										<Text>
											Reservations: {amountReservations}
											{maxReservations
												? `/${maxReservations}`
												: " (no maximum)"}
										</Text>
									</AccordionPanel>
								</AccordionItem>
							)
						)}
					</Accordion>
					<NextLink href="/dashboard/create">
						<Button as="a" variantColor="teal" cursor="pointer">
							Create event
						</Button>
					</NextLink>
				</>
			) : (
				<Flex justify="center" mt={4} width="100%" align="center">
					<Spinner size="xl" />
				</Flex>
			)}
		</Box>
	);
};
