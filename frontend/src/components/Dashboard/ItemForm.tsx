import styles from "./ItemForm.module.css";

interface ItemFormProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingItemId: number | null;
}

const ItemForm = ({
  title,
  setTitle,
  description,
  setDescription,
  handleSubmit,
  editingItemId,
}: ItemFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{editingItemId ? "Редактировать" : "Добавить"} задачу</h2>
      <textarea
        className={styles.title}
        value={title}
        placeholder="Название"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={styles.description}
        value={description}
        placeholder="Описание"
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className={styles.buttons}>
        <button type="submit">
          {editingItemId ? "Редактировать" : "Добавить"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
