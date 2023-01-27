import React from "react";
import { CardFooter, Button, ButtonGroup, Divider } from "@chakra-ui/react";

export const FavouriteBlock = (props: IFavBlockProps) => {
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
            {props.buttonText}{" "}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </div>
  );
};

interface IFavBlockProps {
  buttonText: string;
  buttonCallback: () => void;
}
