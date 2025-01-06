const Input = ({
  type,
  placeholder,
  value,
  onChange,
  classNameContainer,
  className,
}) => {
  return (
    <div className={classNameContainer}>
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

      <label
        htmlFor={placeholder}
        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-300 focus-within:ring-1 focus-within:ring-gray-300"
      >
        <input
          type={type}
          id="UserEmail"
          placeholder={placeholder}
          onChange={onChange}
          className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${className}`}
        />

        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          {placeholder}
        </span>
      </label>
    </div>
  );
};

export default Input;
