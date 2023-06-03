import { Container, Logo, LogoWrapper, Progress, Title } from "./styles";

type SplashPageProps = {
  progress: number;
};

export default function SplashPage(props: SplashPageProps) {
  const { progress } = props;

  return (
    <Container>
      <LogoWrapper>
        <Logo id="whatsapp" />
      </LogoWrapper>
      <Progress progess={progress} />
      <Title>MoreYeahs Teams</Title>
      {/* <SubTitle>
        <EncryptionIcon id="lock" /> End-to-end encrypted. Built by{" "}
        <Link href="https://github.com/jazimabbas" target="_blank">
          Jazim Abbas
        </Link>{" "}
        ❤️.
      </SubTitle> */}
    </Container>
  );
}
