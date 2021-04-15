import React from 'react'
import {
  Heading,
  Text,
  Box,
  List,
  Badge
} from '@chakra-ui/react'

import Announcement from '../../../components/Announcement'
import { query } from '../../../lib/db'

export default function CourseHome({announcements}){

    return (<>
    
    <Heading>Couse Name</Heading>
    <Text>desc</Text>
    <Box>
      <Box>
        <Heading as="h2">Announcements </Heading>
        <List>
          {announcements.map((data, index) => <Announcement key={index} data={data} />)}
        </List>
      </Box>
    </Box>
    
    </>)

}

export async function getServerSideProps(context) {

  const announcements = await query("SELECT aid, pid, cid, title, body FROM announcements WHERE cid = ?", [
    context.query.cid
  ])

    return {
      props: {
        course: null,
        announcements 
      }
    }
  }