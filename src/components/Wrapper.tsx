import { Box } from "@chakra-ui/core";

export interface Props {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<Props> = ({ children, variant = "regular" }) => {
  return (
    <Box
      maxWidth={variant === "regular" ? 800 : 400}
      width="95%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
