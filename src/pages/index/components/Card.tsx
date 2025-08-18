import type { CardDto } from "../types/card";
import styles from "./Card.module.scss";

function Card({ data }: { data: CardDto }) {
  const openDialog = () => {
    console.log("함수호출");
  };
  return (
    <div className={styles.card} onClick={openDialog}>
      <img
        src={data.urls.small}
        alt={data.alt_description}
        className={styles.card__image}
      />
    </div>
  );
}

export default Card;
