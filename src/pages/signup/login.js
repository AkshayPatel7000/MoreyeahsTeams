import Maskgroup from "../../assets/img3.png";
import Microsoft from "../../assets/microsoft.png";
import "./loginCss.js";
import { Button, Container, Content, ImgContainer } from "./loginCss.js";

const Login = () => {
  return (
    <Container>
      <ImgContainer>
        {" "}
        <img src={Maskgroup} style={{ width: "100%", height: "100vh" }} />
      </ImgContainer>

      <Content
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "#212F3D", fontSize: "50px", fontWeight: "700", paddingLeft: "5%" }}>
          Sign in to Clever
        </div>
        <Button style={{ width: "50%", paddingLeft: "5%", gap: "10%" }}>
          <img src={Microsoft} style={{ width: "20px", height: "20px", paddingLeft: "10%" }} />
          Sign in with Microsoft
        </Button>
      </Content>
    </Container>
  );
};

export default Login;
