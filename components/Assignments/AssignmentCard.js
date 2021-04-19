import Link from 'next/link'
import { Box, Heading, Text, Badge } from "@chakra-ui/layout"


const AssignmentCard = ({assignment, cid}) => {
    return (
        <Link href={`/course/${cid}/assignment/${assignment.assnid}`}>
            <Box
            borderRadius="lg"
            boxShadow="lg"
            bg="blue.50"
            p={4}
            w="100%"
            color="blue.900"
            mb="4"
            cursor="pointer"
            // height="150px"
            >
            <Heading>{assignment.title}</Heading>
            <Text>{assignment.body}</Text>
            <Badge borderRadius="full" py={1} px={2} color="blue.800" bg="blue.100">
                Due {assignment.duedate}
            </Badge>
            <Badge borderRadius="full" py={1} px={2} color="blue.800" bg="blue.100">
                {(assignment.submissiontype === "TEXT" || assignment.submissiontype === "BOTH") && "Text submission"  }
            </Badge>
            <Badge borderRadius="full" py={1} px={2} color="blue.800" bg="blue.100">
                {(assignment.submissiontype === "FILE" || assignment.submissiontype === "BOTH") && "File submission"  }
            </Badge>
            </Box>
      </Link>
    )
}

export default AssignmentCard
