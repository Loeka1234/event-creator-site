import React from "react";
import {
  Breadcrumb,
  Icon,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/core";
import Link from "next/link";

export interface Props {
  pages: DashboardPages;
}

export const Pages: React.FC<Props> = ({ pages }) => {
  return (
    <Breadcrumb
      spacing="8px"
      separator={<Icon color="gray.300" name="chevron-right" />}
    >
      <BreadcrumbItem>
        <Link href="/">
          <BreadcrumbLink>Home</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      {pages.map(({ name, path }, i) => (
        <BreadcrumbItem key={i}>
          <Link href={path}>
            <BreadcrumbLink>{name}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
