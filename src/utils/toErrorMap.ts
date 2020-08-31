import { FieldError } from "../generated/graphql";

export const toErrorMap = (error: FieldError) => {
  return {
    [error.field]: error.message,
  };
};
