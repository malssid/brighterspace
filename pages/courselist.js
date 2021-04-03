import { Box, Heading, Text, Flex } from "@chakra-ui/react";

const courselist = ({ courses }) => {
  return (
    <Flex direction="column" align="center">
      {courses.map((course) => (
        <Box boxShadow="lg" bg="blue.50" w="30%" p={4} color="blue.900" mb="4">
          <Heading>{course.Name}</Heading>
          <Text>{course.Description}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/courses");
  const courses = await res.json();
  return {
    props: {
      courses,
    },
  };
}

export default courselist;
