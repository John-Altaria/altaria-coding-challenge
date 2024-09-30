import { Poppins } from "next/font/google";
import { ChangeEvent } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type InputTypes = {
  placeholder?: string;
  type?: "text" | "number" | "email" | "textarea" | "select" | "date" | "time";
  variant?: "contained" | "outlined";
  label?: string;
  name?: string;
  error?: string;
  value?: string | number;
  selectOptions?: { id: number; name: string }[];
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
};

const Input = ({
  placeholder,
  type,
  label,
  variant,
  error,
  name,
  onChange,
  selectOptions,
  value,
}: InputTypes) => {
  return !!variant && variant === "outlined" ? (
    <section>
      <div
        className={`input-container ${
          !!label ? "~h-[32px]/[55px]" : "h-fit"
        }  text-[#00000050] flex flex-col justify-between ${poppins.className}`}
      >
        {!!label ? (
          <p className="~text-[10px]/[12px] text-[#000] ~leading-[126.05%]/[166.667%] font-[500]">
            {label}
          </p>
        ) : null}
        {type === "select" ? (
          <select
            className={`border-b outline-none bg-transparent w-full ~text-[10px]/[14px] leading-[142.857%] text-[#8D8D8D] placeholder:text-[#8D8D8D90] ${
              !!error ? "border-red-500" : ""
            }`}
            name={name}
            onChange={onChange as (e: ChangeEvent<HTMLSelectElement>) => void}
            value={value}
          >
            {placeholder && (
              <option defaultChecked disabled>
                {placeholder}
              </option>
            )}
            {selectOptions?.map((option, index) => (
              <option key={option.id + index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`border-b outline-none bg-transparent w-full ~text-[10px]/[14px] leading-[142.857%] text-[#8D8D8D] placeholder:text-[#8D8D8D90] ${
              !!error ? "border-red-500" : ""
            }`}
            placeholder={placeholder}
            type={!!type ? type : "text"}
            name={name}
            onChange={onChange}
            value={value}
          />
        )}
      </div>
      {!!error ? (
        <p className="text-red-500 mt-[.5rem] text-[10px]/[14px]">{error}</p>
      ) : null}
    </section>
  ) : null;
};

export default Input;
