import { useFormikContext } from "formik"
import React from "react"

export type RadioOption = {
  label: string
  value: string
}

type RadioProps = {
  name: string
  options: RadioOption[]
}

type RadioFormProps = {
  [x: RadioOption["label"]]: RadioOption["value"]
}

/**
 * Radio element
 * Only use inside Formik form
 * @param param0
 * @returns
 */
export const Radio = ({ options, name }: RadioProps) => {
  const { handleChange, handleBlur, values } =
    useFormikContext<RadioFormProps>()

  return (
    <div className="flex flex-col">
      {options.map(({ label, value }) => {
        const id = `${name}=${value}`
        return (
          <label key={id} className="block cursor-pointer">
            <input
              className="hidden"
              name={name}
              id={id}
              type="radio"
              value={value}
              checked={value === values[name]}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <span className="relative inline-block pl-7 before:bg-white after:bg-blue">
              {label}
            </span>

            <style jsx>{`
              // Color is managed in TailwindCSS

              span:before {
                content: "";
                display: block;
                position: absolute;
                top: 6px;
                left: 0px;
                border-radius: 50%;
                width: 16px;
                height: 16px;
              }

              span:after {
                content: "";
                display: block;
                width: 10px;
                height: 10px;
                position: absolute;
                border-radius: 50%;
                top: 9px;
                left: 3px;
                opacity: 0;
                transform: scale(0, 0);
                transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
              }

              input:checked + span:after {
                opacity: 1;
                transform: scale(1, 1);
              }
            `}</style>
          </label>
        )
      })}
    </div>
  )
}
