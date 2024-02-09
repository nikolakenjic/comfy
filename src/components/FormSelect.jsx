const FormSelect = ({ label, name, list, defaultValue, size }) => {
  const listsList = list.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        {listsList}
      </select>
    </div>
  );
};

export default FormSelect;
