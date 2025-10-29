import { Box, Button, Container, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main>
      <Container
        size="3"
        px={{ initial: "4", md: "6" }}
        py={{ initial: "6", md: "8" }}
      >
        <Box
          style={{
            margin: "0 auto",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Heading mb="2">Product not found</Heading>
          <Text color="gray" mb="4">
            We could not locate the product you were looking for. It may have
            been removed or the identifier is incorrect.
          </Text>
          <Button asChild>
            <Link href="/">Browse catalogue</Link>
          </Button>
        </Box>
      </Container>
    </main>
  );
}
