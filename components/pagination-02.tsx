import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationWithPrimaryButton({
  page,
  totalPages,
  onPageChange,
}: Props) {
  // =========================
  // BUILD PAGE NUMBERS (MAX 3)
  // =========================
  const getPages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page === 1) return [1, 2, 3];
    if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];

    return [page - 1, page, page + 1];
  };

  const pages = getPages();

  const handlePageClick = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="w-full mx-auto mt-8">
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageClick(page - 1)}
              className={cn(
                "cursor-pointer",
                page === 1 && "pointer-events-none opacity-50"
              )}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {/* Page Numbers (MAX 3) */}
          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => handlePageClick(p)}
                className={cn(
                  "cursor-pointer transition-all",
                  p === page && buttonVariants({
                    variant: "default",
                    size: "icon",
                  }),
                  p !== page && "hover:bg-accent"
                )}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageClick(page + 1)}
              className={cn(
                "cursor-pointer",
                page === totalPages && "pointer-events-none opacity-50"
              )}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}