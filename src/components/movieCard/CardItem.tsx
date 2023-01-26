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
import { FavouriteBlock } from "./FavouriteBlock";
import Link from "next/link";

interface IMovieProps {
  isFavourite: boolean;
  loginData: ILoginData;
  payload: IMovie;
}

export const CardItem = (props: any) => {
  console.log(props);
  const maxW = props.maxW || "sm";
  return (
    <div>
      <Card maxW={maxW}>
        <CardBody>
          <Image
            src={`${props.imagePath}`}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            boxSize="200px"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">
              {props.id === "" || props.id === undefined ? (
                <div>{`${props.title}`}</div>
              ) : (
                <Link href={`http://localhost:3000/movies/${props.id}`}>
                  {`${props.title}`}
                </Link>
              )}
            </Heading>
            <Text>{props.description}</Text>
            {/* <Text color="blue.600" fontSize="2xl">
              $450
            </Text> */}
          </Stack>
        </CardBody>
        {props.favouriteSection ? (
          <FavouriteBlock
            buttonCallback={props.buttonCallback}
            buttonText={props.buttonText}
          />
        ) : (
          ""
        )}
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
