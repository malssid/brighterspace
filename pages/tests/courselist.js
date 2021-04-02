// TODO - Not at all a pretty page - but database connection is working!

export async function getStaticProps(context) {
    const res = await fetch(`http://localhost:3000/api/courses`)
    const data = await res.json()
  
    return {
      props: { data },
    }
  }

function CList(props) {
    return <> List of classes: {props.data.map(item => <p>{item.Name}</p>)} </>
}
export default CList;
