import "./PaginationControl.css";
import { UniversalButton } from "../common/universalButton/UniversalButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-control">
      <UniversalButton
        onClick={() => onPageChange(currentPage - 1)}
        variant="secondary"
        className={currentPage === 1 ? "disabled" : ""}
      >
        &lt; Poprzednia
      </UniversalButton>

      <span className="page-info">
        Strona {currentPage} z {totalPages}
      </span>

      <UniversalButton
        onClick={() => onPageChange(currentPage + 1)}
        variant="secondary"
        className={currentPage === totalPages ? "disabled" : ""}
      >
        Następna &gt;
      </UniversalButton>
    </div>
  );
};
