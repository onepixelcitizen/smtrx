import { FC, MouseEvent } from "react";
import {
  FieldErrorsImpl,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { ILoginForm } from "components/LoginForm/LoginForm";

import "./style.css";

enum InputTypeOptions {
  button = "button",
  text = "text",
}

interface IInput {
  id: string;
  label?: string;
  type: keyof typeof InputTypeOptions;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  register?: UseFormRegister<ILoginForm>;
  validation?: RegisterOptions;
  errors?: FieldErrorsImpl<ILoginForm>;
}

const Input: FC<IInput> = ({
  id,
  label,
  type,
  onClick,
  register,
  validation,
  errors,
}) => {
  return (
    <>
      {type === InputTypeOptions.button ? (
        <input type="submit" value={label} onClick={onClick} />
      ) : (
        <div className="input-wrapper">
          <label htmlFor={id}>{label}</label>
          <input
            type="text"
            id={id}
            {...register?.(id as keyof ILoginForm, validation)}
          />
          {errors?.[id as keyof ILoginForm] && (
            <i className="error-message">
              {errors?.[id as keyof ILoginForm]?.message}
            </i>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
