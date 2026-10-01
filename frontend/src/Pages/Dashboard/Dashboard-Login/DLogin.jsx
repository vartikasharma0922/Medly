import React, { useState } from "react";
import { Radio } from "antd";
import banner from "../../../img/banner.png";
import admin from "../../../img/admin.jpg";
import "./DLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminLogin,
  DoctorLogin,
  forgetPassword,
  NurseLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer } from "antd";
const notify = (text) => toast(text);

const DLogin = () => {
  const demoIds = { Nurse: 102, Doctor: 101, Admin: 100 };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [placement, SetPlacement] = useState("Nurse");
  const [formvalue, setFormvalue] = useState({
    ID: "",
    password: "",
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!formvalue.ID || !formvalue.password) return;

    const loginRequests = {
      Nurse: { action: NurseLogin, idField: "nurseID" },
      Doctor: { action: DoctorLogin, idField: "docID" },
      Admin: { action: AdminLogin, idField: "adminID" },
    };
    const { action, idField } = loginRequests[placement];
    const loginData = { ...formvalue, [idField]: formvalue.ID };

    setLoading(true);
    try {
      const res = await dispatch(action(loginData));
      if (res?.message === "Successful") {
        notify("Login Successful");
        navigate("/dashboard");
      } else if (res?.message === "Wrong credentials") {
        notify("Wrong credentials");
      } else if (res?.message === "Network error") {
        notify("Cannot reach the hospital server. Start the backend and try again.");
      } else {
        notify("Something went wrong. Please try again.");
      }
    } catch (error) {
      notify("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };

  const [ForgetPassword, setForgetPassword] = useState({
    type: "",
    email: "",
  });

  const HandleForgetPassword = (e) => {
    setForgetPassword({ ...ForgetPassword, [e.target.name]: e.target.value });
  };

  const [forgetLoading, setforgetLoading] = useState(false);

  const HandleChangePassword = () => {
    if (ForgetPassword.type === "") {
      return notify("Please Fill all Details");
    }
    setforgetLoading(true);
    dispatch(forgetPassword(ForgetPassword)).then((res) => {
      if (res.message === "User not found") {
        setforgetLoading(false);
        return notify("User Not Found");
      }
      setForgetPassword({
        type: "",
        email: "",
      });
      onClose();
      setforgetLoading(false);
      return notify("Account Details Send");
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="mainLoginPage">
        <section className="leftside">
          <div className="login-brand">
            <span className="login-brand-mark" aria-hidden="true">M</span>
            <span>Medly</span>
          </div>
          <div className="login-intro">
            <p className="login-eyebrow">Care, connected</p>
            <h2>Better care starts with a team in sync.</h2>
            <p>One calm, connected workspace for the people who care for us.</p>
          </div>
          <img src={banner} alt="Healthcare team working together" />
          <p className="login-caption">A clearer view of care, every day.</p>
        </section>
        <div className="rightside">
          <div className="login-brand login-card-brand">
            <span className="login-brand-mark" aria-hidden="true">M</span>
            <span>Medly</span>
          </div>
          <div className="login-heading">
            <p className="login-eyebrow">Welcome back</p>
            <h1>Sign in</h1>
            <p>Choose your workspace to continue.</p>
          </div>
          <div>
            <Radio.Group
              value={placement}
              onChange={placementChange}
              className={"radiogroup"}
            >
              <Radio.Button value="Nurse" className={"radiobutton"}>
                Nurse
              </Radio.Button>
              <Radio.Button value="Doctor" className={"radiobutton"}>
                Doctor
              </Radio.Button>
              <Radio.Button value="Admin" className={"radiobutton"}>
                Admin
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="demo-credentials">
            <img src={admin} alt="" />
            <div>
              <p>Demo access</p>
              <span>ID {demoIds[placement]} <i /> Password masai</span>
            </div>
          </div>
          <div className="login-form-wrap">
            <form onSubmit={HandleSubmit}>
              <label htmlFor="login-id">{placement} ID</label>
              <input
                id="login-id"
                type="number"
                name="ID"
                value={formvalue.ID}
                onChange={Handlechange}
                required
              />
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={formvalue.password}
                onChange={Handlechange}
                required
              />
              <button type="submit" disabled={Loading}>
                {Loading ? "Signing in..." : "Sign in"}
              </button>
              <p className="forgot-password">
                Forgot your password?{" "}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={showDrawer}
                  onKeyDown={(event) => event.key === "Enter" && showDrawer()}
                >
                  Recover account
                </span>
              </p>

              {/* ********************************************************* */}
              <Drawer
                title="Forget Password"
                placement="left"
                onClose={onClose}
                open={open}
              >
                <div>
                  <label style={{ fontSize: "18px" }}>Choose Type</label>

                  <select
                    name="type"
                    value={ForgetPassword.type}
                    onChange={HandleForgetPassword}
                    required
                  >
                    <option value="">User Type</option>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "18px" }}>
                    Enter Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    value={ForgetPassword.email}
                    onChange={HandleForgetPassword}
                    required
                    style={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#f4f8f6",
                      fontSize: "18px",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  />
                </div>

                <button
                  type="button"
                  style={{
                    width: "50%",
                    margin: " 20px auto",
                    display: "flex",
                    padding: "10px",
                    fontSize: "18px",
                    backgroundColor: "#167d68",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                  onClick={HandleChangePassword}
                >
                  {forgetLoading ? "Loading..." : " Send Mail"}
                </button>
              </Drawer>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLogin;
