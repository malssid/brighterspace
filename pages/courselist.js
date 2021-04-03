import { Flex } from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";

const courselist = ({ courses }) => {
  return (
    <Flex direction="column" align="center">
      {courses.map((course) => (
        <CourseCard
          id={course.cid}
          name={course.Name}
          desc={course.Description}
          term={course.Term}
        />
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
