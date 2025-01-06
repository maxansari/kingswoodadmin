const Button = ({ children, variant, className, onSubmit, onClick }) => {
  return (
    <>
      {/* Base */}

      {variant == "contained" ? (
        <a
          className={`inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-black hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-white ${className}`}
          href="#"
          onSubmit={onSubmit}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <a
          className={`inline-block rounded border border-white px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-black focus:outline-none focus:ring active:bg-white ${className}`}
          href="#"
          onSubmit={onSubmit}
          onClick={onClick}
        >
          {children}
        </a>
      )}
    </>
  );
};

export default Button;
