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

import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { IMovie } from "../../services/tmdb/moviesAPI";

interface IMovieProps {
  isFavourite: boolean;
  loginData: ILoginData;
  payload: IMovie;
}

export const CardItem = ({ isFavourite, loginData, payload }: IMovieProps) => {
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={`${props.imageLink}`}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            boxSize="200px"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{`${props.title}`}</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            {/* <Button variant="solid" colorScheme="blue">
              Buy now
            </Button> */}
            {/* <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button> */}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

interface ILoginData {
  isLoggedIn: boolean;
  isAuth: boolean;
  sessionId: string;
  userId: any;
  message: string;
  lastValidated: string;
}
