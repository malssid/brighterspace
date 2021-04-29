import React from 'react'
import { Group, Link } from "../../components/Navbar"

import { SmallCloseIcon, HamburgerIcon } from "@chakra-ui/icons"

import { signOut } from "next-auth/client"

function HomeDashboard({active}) {
    return (
        <>
            <Group title="Your Stuff">
                <Link icon={<HamburgerIcon color="gray.500" />} href="/" text="Your Courses" active={active === "courses" ? true : false}></Link>
            </Group>
            <Group title="Account">
                <Link icon={<SmallCloseIcon color="gray.500" />} text="Sign Out" onClick={() => signOut()}></Link>
            </Group>
      </>
    )
}

export default HomeDashboard
