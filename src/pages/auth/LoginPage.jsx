import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { IoIosAlert } from "react-icons/io";
import { useAuth } from "../../context/useAuth.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit((data) => {
    signin(data);
    // console.log(signinErrors);
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className="container-login">
        <div id="form-ui">
          <form action="" method="post" id="form" onSubmit={onSubmit}>
            {signinErrors && (
              <div className="errorContainer">
                {signinErrors.map((error, i) => (
                  <div className="error" key={i}>
                    <IoIosAlert /> {error}
                  </div>
                ))}
              </div>
            )}
            <div id="form-body">
              <div id="welcome-lines">
                <div id="welcome-line-1">Admin</div>
                <div id="welcome-line-2">Welcome Back, Anyelys</div>
              </div>
              <div id="input-area">
                <div className="form-inp">
                  <input
                    placeholder="Username"
                    autoComplete="off"
                    type="text"
                    {...register("username", { required: true })}
                  />
                </div>
                {errors.username && (
                  <p className="error">
                    <IoIosAlert /> Username is required!
                  </p>
                )}
                <div className="form-inp">
                  <input
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", { required: true, minLength: 1 })}
                  />
                </div>

                {errors.password && (
                  <p className="error">
                    <IoIosAlert /> Password is required!
                  </p>
                )}
              </div>
              <div id="submit-button-cvr">
                <button id="submit-button" type="submit">
                  Login
                </button>
              </div>
              {/* <div id="forgot-pass">
              <a href="#">Forgot password?</a>
            </div> */}
              <div id="bar"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
