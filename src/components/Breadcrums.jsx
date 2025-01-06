import Link from "next/link";

const Breadcrums = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-white">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link
              href={item.href}
              className={`block transition hover:text-blue-400 ${
                index === items.length - 1 ? "font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 mx-2 rtl:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrums;
