import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import "./style.css";

enum InputTypeOptions {
  button = "button",
  text = "text",
}

interface IInput {
  id: string;
  label?: string;
  type: keyof typeof InputTypeOptions;
  onClick?: (e: any) => void;
  register?: UseFormRegister<any>;
  validation?: any;
  errors?: any;
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
          <input type="text" id={id} {...register?.(id, validation)} />
          {errors?.[id] && (
            <i className="error-message">{errors[id].message}</i>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
