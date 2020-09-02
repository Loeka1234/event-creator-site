import { Flex, Heading, Box, Button, Link } from "@chakra-ui/core";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export interface Props {}

export const NavBar: React.FC<Props> = ({}) => {
	const { data, loading, error } = useMeQuery();
	const [logout] = useLogoutMutation();
	const apolloclient = useApolloClient();
	const [show, setShow] = useState(false);
	const handleToggle = () => setShow(!show);

	if (loading && !error) return null;

	return (
		<Box as="header" borderBottom="1px solid" borderBottomColor="gray.200">
			<Flex
				maxWidth={1200}
				mx="auto"
				align="center"
				justify="space-between"
				wrap="wrap"
				padding=".5rem"
				px={5}
				bg="transparent"
				color="gray.300"
			>
				<Flex align="center" mr={5}>
					<Heading as="h1" size="lg" color="gray.700">
						Eventor
					</Heading>
				</Flex>

				<Flex
					display={{ base: "flex", md: "none" }}
					onClick={handleToggle}
					cursor="pointer"
				>
					<FiMenu size={30} />
				</Flex>

				<Box
					as="nav"
					display={{ sm: show ? "flex" : "none", md: "flex" }}
					width={{ sm: "full", md: "auto" }}
					alignItems="center"
					justifyContent="flex-start"
					flexGrow={1}
					flexDir={{ sm: "column", md: "row" }}
					color="gray.700"
				>
					<NextLink href="/">
						<Link mx={4} fontSize={20}>
							Home
						</Link>
					</NextLink>
					<NextLink href="/about">
						<Link mx={4} fontSize={20}>
							About
						</Link>
					</NextLink>
					<NextLink href="/events">
						<Link mx={4} fontSize={20}>
							Events
						</Link>
					</NextLink>
				</Box>

				<Box
					display={{ sm: show ? "flex" : "none", md: "flex" }}
					m={{ base: 2, md: 1 }}
					justifyContent="flex-start"
					alignItems="center"
					flexDir={{ sm: "column", md: "row" }}
					width={{ sm: "100%", md: "auto" }}
				>
					{data?.me ? (
						<>
							<NextLink href="/dashboard">
								<Link fontSize={20} color="gray.700">
									{capitalizeFirstLetter(data.me.username)}
								</Link>
							</NextLink>
							<Link
								as="button"
								color="gray.700"
								mx={4}
								fontSize={20}
								onClick={async () => {
									await logout();
									await apolloclient.resetStore();
								}}
							>
								Logout
							</Link>
						</>
					) : (
						<>
							<NextLink href="/register">
								<a>
									<Button size="sm" variantColor="teal">
										Register
									</Button>
								</a>
							</NextLink>

							<NextLink href="/login">
								<Link color="gray.700" mx={4} fontSize={20}>
									Login
								</Link>
							</NextLink>
						</>
					)}
				</Box>
			</Flex>
		</Box>
	);
};
