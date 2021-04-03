import { Flex, Heading, Text, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex direction="column" align="center">
      <Heading size="4xl" mb="5" color="blue.50">
        This is a Heading
      </Heading>
      <Text w="80%" mb="5" color="blue.200">
        Ut suscipit molestie pretium. Cras placerat tortor at nunc aliquet
        dictum. Aliquam erat volutpat. Ut feugiat a diam molestie pharetra.
        Curabitur nibh nibh, hendrerit nec enim in, consequat gravida ante.
        Suspendisse consequat libero tellus. Sed ex tellus, lobortis sit amet
        justo nec, tempor ultrices lacus. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Donec porttitor
        nulla non nisi iaculis dapibus. Sed vulputate quis dolor et placerat.
        Vestibulum id nisi rutrum, pulvinar massa et, faucibus purus. Donec
        malesuada, nunc et elementum suscipit, nibh massa imperdiet dui, a
        varius risus turpis in diam. Duis ultricies malesuada pharetra. Cras
        tristique, purus ac lobortis blandit, risus tortor ornare nulla, eu
        tristique tortor nulla nec erat. Aliquam porttitor erat ac sapien semper
        laoreet.
      </Text>
    </Flex>
  );
}
