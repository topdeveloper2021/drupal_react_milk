import React from "react";

interface FormatSelectProps {
  format: number;
  formatOptions: Array<string>;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const FormatSelect: React.FC<FormatSelectProps> = (
  props: FormatSelectProps
) => {
  const { format, formatOptions, onChange, ...rest } = props;
  return (
    <div className="form-group format-select-box">
      <div className="row">
        <label className="col-md-3 control-label" htmlFor="format">
          Program View:
        </label>
        <div className="col-md-9">
          <select
            name="format"
            className="form-control"
            value={format}
            onChange={onChange}
            {...rest}
          >
            {formatOptions.map((item, index) => (
              <option key={index} value={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormatSelect;
