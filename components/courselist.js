// TODO - Not at all a pretty page - but database connection is working!
import {useState, useEffect} from 'react'


function CList(props) {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`/api/courses`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setCourses(data);
    })
  }, [])


  return (
    <>
      {" "}
      List of classes:{" "}
      {courses.map((item) => (
        <p key={item.Name}>{item.Name}</p>
      ))}{" "}
    </>
  );
}
export default CList;
