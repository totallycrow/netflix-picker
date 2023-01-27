import React from "react";
import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { FavouriteBlock } from "./FavouriteBlock";
import Link from "next/link";

export const CardItem = (props: ICardConfig) => {
  console.log(props);
  const maxW = props.maxW || "sm";
  return (
    <div>
      <Card maxW={maxW} w={props.w}>
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

interface ICardConfig {
  imagePath: string;
  title: string;
  description: string;
  buttonCallback: () => void;
  buttonText: string;
  id?: string;
  maxW?: string;
  w?: string;
  favouriteSection: boolean;
}
