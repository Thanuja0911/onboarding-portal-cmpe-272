import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import Logo from "../../assets/img/logo.png";
import { signup } from "../../redux/actions/userAction";
import SignUpImage from "../../assets/img/signupImage.jpg";
import { connect } from "react-redux";
import store from "../../redux/store";
import "./SignUp.css";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const signUpMail = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const data = {
        name,
        role,
        email,
        password
      };
      let chck = await props.signup(data);
      console.log(chck);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (props.alert_message !== null && props.alert_message !== undefined) {
      alert("Error in signup: " + props.alert_message.data.message);
      store.dispatch({ type: "SET_ALERT", payload: { message: null } });
    }
  }, [props.alert_message]);

  return (
    <Grid container className="signup-container">
      {/* Left Section */}
      <Grid item xs={6} className="left-section">
        <Box className="branding">
          <img alt="logo" src={Logo} style={{ marginBottom: "1rem", width: "100px" }}/>
          <Typography variant="h4" className="tagline">
            Welcome to Your Journey!
          </Typography>
          <Typography variant="body1" className="description">
            Simplify onboarding with our platform.
          </Typography>
          <img alt="signup" src={SignUpImage} className="signup-image" />
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item xs={6} className="right-section">
        <Box className="form-container">
          <Typography variant="h4" className="form-heading">
            Create Account
          </Typography>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          /> */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
            }
            label="I agree to the Terms & Conditions"
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="contained"
            fullWidth
            className="submit-button"
            onClick={signUpMail}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create an Account"}
          </Button>
          <Typography variant="body2" className="signin-link" style={{ marginTop: "10px", fontWeight: 600 }}>
            Already a user? <Link to="/signin">Sign in here</Link>.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapActionWithProps = {
  signup,
};

const mapPropsWithState = (state) => ({
  alert_message: state.user.alert_message,
  success_message: state.user.success_message,
});

export default connect(mapPropsWithState, mapActionWithProps)(SignUp);