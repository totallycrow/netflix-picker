import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";

export const FavouriteBlock = (props: any) => {
  return (
    <div>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => props.buttonCallback()}
          >
            {props.buttonText}
          </Button>
          {/* <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button> */}
        </ButtonGroup>
      </CardFooter>
    </div>
  );
};
