import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  resetCode: string;
}

export default function ResetPasswordEmail({
  name,
  resetCode,
}: ResetPasswordEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Your Password</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Reset Your Password</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {name},</Heading>
        </Row>
        <Row>
          <Text>
            You have requested to reset your password. Please use the following
            verification code to complete the password reset process:
          </Text>
        </Row>
        <Row>
          <Text>{resetCode}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this password reset, please ignore this
            email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
