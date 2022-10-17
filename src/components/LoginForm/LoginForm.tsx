import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input } from "components";
import { ActionType, useAuthContext } from "context/Auth";
import { useAuth } from "hooks";
import { setAuthToken } from "utils";

import "./style.css";

export interface ILoginForm {
  name: string;
  email: string;
}

interface IResponse {
  response: { data: { error: { code: string } } };
}

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({});

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const { mutate } = useAuth();

  const handleClick: SubmitHandler<ILoginForm> = formData => {
    mutate(
      { client_id: String(process.env.REACT_APP_CLIENT_ID), ...formData },
      {
        onSettled: data => {
          setAuthToken(data?.data.data.sl_token);
          dispatch({ type: ActionType.SET_AUTH, payload: { isAuth: true } });
          navigate("/dashboard");
        },
        onError: error =>
          console.error((error as IResponse)?.response?.data?.error?.code),
      },
    );
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(handleClick)}>
      <span>Login</span>
      <Input
        id="name"
        label="Name"
        type="text"
        register={register}
        validation={{
          required: "Please enter your name",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
          pattern: {
            value: /^[A-Za-z@.]+$/,
            message: "👀 This input field should not contain numbers",
          },
        }}
        errors={errors}
      />

      <Input
        id="email"
        label="Email"
        type="text"
        register={register}
        validation={{
          required: "Please enter your email address",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "🤔 Hmm, this doesn't match usual email format",
          },
        }}
        errors={errors}
      />

      <Input id="submit" label="Submit" type="button" />
    </form>
  );
};

export default LoginForm;
