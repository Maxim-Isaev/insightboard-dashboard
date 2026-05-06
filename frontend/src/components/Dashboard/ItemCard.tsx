import styles from "./ItemCard.module.css";
import type { Item } from "../../api/itemsApi";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const ItemCard = ({ item, onEdit, onDelete }: ItemCardProps) => {
  return (
    <div className={styles.card}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={styles.buttons}>
        <button onClick={() => onEdit(item)}>Редактировать</button>
        <button onClick={() => onDelete(item.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default ItemCard;
