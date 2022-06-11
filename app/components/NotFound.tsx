import { Heading, Stack, Text, Image } from "@chakra-ui/react";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFound() {
    return (
        <Stack alignItems="center" justifyContent="center" height="100vh">
            <Heading fontSize="6xl">Page Not Found</Heading>
            <Text fontSize="6xl"><FontAwesomeIcon icon={faHeartBroken} style={{ filter: "url(/filters.svg#woodcut)" }} /></Text>
            <Image src="/possibli.gif" />
        </Stack>
    )
}