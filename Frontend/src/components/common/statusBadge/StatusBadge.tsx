import "./StatusBadge.css";

interface StatusBadgeProps {
  dostepny: boolean;
}

export const StatusBadge = ({ dostepny }: StatusBadgeProps) => {
  return (
    <span
      className={`status-badge ${
        dostepny ? "status-available" : "status-sold"
      }`}
    >
      {dostepny ? "Dostępny" : "Sprzedany"}
    </span>
  );
};
