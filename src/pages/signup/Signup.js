import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./signup.module.css";
import { loginRequest } from "services/authConfig";
import { UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Auth_Store } from "store/auth.store";
import "./loginCss.js";
import { StyledButton, Container, ImgField, Content, Button, ImgContainer } from "./loginCss.js";
import Maskgroup from "../../assets/img3.png";
import Microsoft from "../../assets/microsoft.png";
import { Users } from "services/Firebase/Collection";
import { GoogleLoginButton, MicrosoftLoginButton } from "react-social-login-buttons";
import { auth, provider } from "services/Firebase/config";
import { GetAllUsers } from "services/Firebase/User.service";
function Signup() {
  const params = useParams();
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const onButtonPress = async (loginType = "popup") => {
    if (loginType === "popup") {
      const res = await instance.loginPopup(loginRequest);
      var image = `https://i.pravatar.cc/150?img=${Math?.floor(Math?.random() * 71)}`;
      Users.doc(res.uniqueId)
        .set({
          email: res.account.username,
          name: res.account.name,
          id: res.uniqueId,
          image,
        })
        .then(async (resp) => {
          var profile = {
            ...res,
            profile: {
              email: res.account.username,
              name: res.account.name,
              id: res.uniqueId,
              image,
            },
          };

          Auth_Store.setUserCred(profile);
          Auth_Store.setIsLoggedIn(true);
          localStorage.setItem("userCred", JSON.stringify(profile));
          await GetAllUsers();
          navigate("/");
        })
        .catch((err) => {
          console.log("🚀 ~ file: Signup.js:32 ~ .then ~ err:", err);
        });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  const GoogleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        var user = res.user.providerData[0];

        Users.doc(user.uid)
          .set({
            email: user.email,
            name: user.displayName,
            id: user.uid,
            image: user.photoURL,
          })
          .then(async (resp) => {
            var profile = {
              ...user,
              profile: {
                email: user.email,
                name: user.displayName,
                id: user.uid,
                image: user.photoURL,
              },
            };
            console.log("🚀 ~ file: Signup.js:27 ~ .then ~ resp:", profile);
            Auth_Store.setUserCred(profile);
            Auth_Store.setIsLoggedIn(true);
            localStorage.setItem("userCred", JSON.stringify(profile));
            await GetAllUsers();
            navigate("/");
          })
          .catch((err) => {
            console.log("🚀 ~ file: Signup.js:32 ~ .then ~ err:", err);
          });
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };
  return (
    <UnauthenticatedTemplate>
      {/* <div className="container" id="container">
        <section>
          <div className="bsk-container">
            <button className="bsk-btn bsk-btn-default" onClick={() => onButtonPress()}>
              <object
                type="image/svg+xml"
                data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
                className="x-icon"
              ></object>
              Sign in with Microsoft
            </button>
          </div>
        </section>
      </div> */}
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
          <div style={{ width: "60%" }}>
            <div
              style={{ color: "#212F3D", fontSize: "30px", fontWeight: "700", paddingLeft: "5%" }}
            >
              Sign in to
            </div>
            <div
              style={{ color: "#212F3D", fontSize: "50px", fontWeight: "700", paddingLeft: "5%" }}
            >
              Moreyeahs Teams
            </div>
            <div style={{ marginTop: "30px" }}>
              <MicrosoftLoginButton onClick={() => onButtonPress()} />
              <div style={{ height: "10px" }} />
              <GoogleLoginButton onClick={() => GoogleLogin()} />
            </div>
          </div>
        </Content>
      </Container>
    </UnauthenticatedTemplate>
  );
}

export default Signup;
