import sprite from "../img/sprite.svg";

function Icon({ iconName, className, side = 20 }) {
  return (
    <svg
      className={className}
      style={{ display: "block", width: side, height: side }}
    >
      <use href={sprite + "#" + iconName} />
    </svg>
  );
}

export default Icon;