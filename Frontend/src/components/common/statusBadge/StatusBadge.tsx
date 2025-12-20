import "./StatusBadge.css";

interface StatusBadgeProps {
  isAvailable: boolean;
}

export const StatusBadge = ({ isAvailable }: StatusBadgeProps) => {
  return (
    <span
      className={`status-badge ${
        isAvailable ? "status-available" : "status-sold"
      }`}
    >
      {isAvailable ? "Dostępny" : "Sprzedany"}
    </span>
  );
};
