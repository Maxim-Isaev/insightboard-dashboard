import styles from "./ItemList.module.css";
import type { Item } from "../../api/itemsApi";
import ItemCard from "./ItemCard";

interface ItemListProps {
  items: Item[];
  loading: boolean;
  error: string | null;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const ItemList = ({
  items,
  loading,
  error,
  onEdit,
  onDelete,
}: ItemListProps) => {
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.listContainer}>
      <h2>Список задач</h2>
      <div className={styles.list}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default ItemList;
