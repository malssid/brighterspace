import React from "react";

/**
 * Display's a user's current grade in the course or (instructor role) the average grade
 * of a student and the grading distribution
 *
 * @param {prop} cid The course where the gradebook summary needs to be calculated
 * @param {prop} pid The student to calculate the grade summary for (if in student role)
 * @returns
 */
function CourseGradeCard({ cid, pid, cachedGrade }) {
  let grade = cachedGrade;

  // No cachedGrade from getServerSideProps, it must be fetched from the server
  if (!cachedGrade) {
  }

  return <div></div>;
}

export default CourseGradeCard;
