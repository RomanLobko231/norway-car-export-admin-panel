import { RiArrowLeftBoxLine, RiArrowRightBoxLine } from "react-icons/ri";

const PageArrows = ({ page, setPage, totalPages }) => {
  return (
    <>
      {totalPages != null && totalPages != undefined && totalPages > 0 && (
        <div className="mt-8 flex flex-row items-center gap-3 text-medium-gray">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            <RiArrowLeftBoxLine
              className={`h-10 w-auto ${page === 0 ? "opacity-30 hover:opacity-30" : "hover:opacity-50 active:opacity-10"} `}
            />
          </button>
          <span className="select-none text-base font-medium md:text-2xl">
            {page + 1} / {totalPages}{" "}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
          >
            <RiArrowRightBoxLine
              className={`h-10 w-auto ${page === totalPages - 1 ? "opacity-30 hover:opacity-30" : "hover:opacity-50 active:opacity-10"} `}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default PageArrows;
