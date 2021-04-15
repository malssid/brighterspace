import { Box, Badge, Text } from '@chakra-ui/react'

export default function Announcement({data}) {
    return (
        <Box>
            <Badge variant="subtle">Posted on Jan 1</Badge>
            <Text>{data.body}</Text>
        </Box>
    )
}
