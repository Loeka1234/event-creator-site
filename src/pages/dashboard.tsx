import { NextPage } from "next";
import { withApollo } from "../utils/withApollo";
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
  Link as ChakraLink,
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
          <Accordion my={3} allowMultiple>
            {data.events.map(({ title, id, description }, i) => (
              <AccordionItem
                key={id}
                rounded="lg"
                borderWidth="1px"
                maxW={600}
                boxShadow="sm"
                my={4}
                width="100%"
              >
                <AccordionHeader
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex justify="space-between" align="center" width="100%">
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
                      <Link
                        href="/dashboard/edit/[id]"
                        as={`/dashboard/edit/${id}`}
                      >
                        <IconButton
                          icon="edit"
                          aria-label="Edit event"
                          as="a"
                          cursor="pointer"
                          onClick={e => e.stopPropagation()}
                        />
                      </Link>
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
                            onClick={(e: any) => e.stopPropagation()}
                          />
                          <PopoverBody>
                            Do you want to delete this event? This is an action
                            that can't be undone.
                          </PopoverBody>
                          <PopoverFooter d="flex" justifyContent="flex-end">
                            <Button
                              variantColor="red"
                              onClick={async () => {
                                await deleteEvent({
                                  variables: {
                                    id: id as number,
                                  },
                                  update: cache => {
                                    cache.modify({
                                      id: cache.identify(data.events[i]),
                                      fields: {
                                        id(_, { DELETE }) {
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
                      <AccordionIcon size="30px" ml={3} />
                    </Box>
                  </Flex>
                </AccordionHeader>
                <AccordionPanel>
                  <Text>{description}</Text>
                  <Text>
                    Link:{" "}
                    <Link href="/events/[id]" as={`/events/${id}`}>
                      <ChakraLink textDecor="underline">
                        {process.env.NEXT_PUBLIC_DOMAIN}/events/{id}
                      </ChakraLink>
                    </Link>
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Link href="/dashboard/create">
            <Button as="a" variantColor="teal" cursor="pointer">
              Create event
            </Button>
          </Link>
        </>
      ) : (
        <Flex justify="center" minH="80vh" align="center">
          <Spinner size="xl" />
        </Flex>
      )}
    </DashboardLayout>
  );
};

export default withApollo({ ssr: false })(Dashboard);
