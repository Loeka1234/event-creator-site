import { Box, BoxProps } from "@chakra-ui/core";

export type Props = BoxProps & {
  variant?: "small" | "regular" | "large";

}

export const Wrapper: React.FC<Props> = ({ children, variant = "regular", ...props }) => {
  return (
    <Box
      maxWidth={variant === "large" ? 1200 : variant === "regular" ? 800 : 400}
      width="95%"
      mt={8}
      mx="auto"
      {...props}
    >
      {children}
    </Box>
  );
};
