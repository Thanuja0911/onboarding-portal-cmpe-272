import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, notification } from "antd";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import { signin } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import store from "../../redux/store";
import Logo from "../../assets/img/logo.png";
import SignUpImage from "../../assets/img/signupImage.jpg";
import "../signup/SignUp.css";

const SignIn = (props) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const signInMail = async () => {
  setLoading(true);
  try {
    const data = {
      email: email,
      password: password,
    };
    let chck = await props.signin(data);
  } catch (e) {
    console.log(e);
  }
  setLoading(false);
};

const close = () => {
  store.dispatch({ type: "SET_ALERT", payload: { message: null } });
};

const openNotification = (data) => {
  notification["error"]({
    message: "Error in signin",
    description: data.message,
    onClose: close,
  });
};

useEffect(() => {
  if (props.alert_message !== null && props.alert_message !== undefined) {
    openNotification(props.alert_message.data);
    console.log(props.alert_message.data);
  }
}, [props.alert_message]);

return (
  <Grid container className="signup-container">
    {/* Left Section */}
    <Grid item xs={6} className="left-section">
      <div className="branding">
        <Link to="/">
          <img alt="logo" src={Logo} className="logo" />
        </Link>
        <Typography variant="h4" className="tagline">
          Welcome Back!
        </Typography>
        <Typography variant="body1" className="description">
          Log in to your account and continue your journey.
        </Typography>
        <img alt="signup" src={SignUpImage} className="signup-image" />
      </div>
    </Grid>

    {/* Right Section */}
    <Grid item xs={6} className="right-section">
      <div className="form-container">
        <Typography variant="h4" className="form-heading">
          Login to Your Account
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              signInMail();
            }
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              signInMail();
            }
          }}
        />
        {/* <Input
          placeholder="Email"
          bordered={false}
          className="signupInput"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              signInMail();
            }
          }}
        />
        <Input.Password
          placeholder="Password"
          bordered={false}
          className="signupInput"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              signInMail();
            }
          }}
        /> */}
        <Button
          variant="contained"
          fullWidth
          className="submit-button"
          style={{ padding: "0px 20px" }}
          type="primary"
          // loading={loading}
          onClick={signInMail}
        >
          Login 
        </Button>
        <Link to="/forgot-password">
          <Typography variant="body2" className="forgot-password-link" style={{ marginTop: "10px"}}>
            Forgot password? Click here to reset.
          </Typography>
        </Link>
      </div>
    </Grid>
  </Grid>
);
};

const mapActionWithProps = {
signin,
};

const mapPropsWithState = (state) => ({
alert_message: state.user.alert_message,
success_message: state.user.success_message,
});

export default connect(mapPropsWithState, mapActionWithProps)(SignIn);
