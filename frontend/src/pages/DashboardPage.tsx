import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchItems, addItem, editItem, removeItem } from "../store/ItemsSlice";
import type { Item } from "../api/itemsApi";
import LineChart from "../components/Charts/LineChart";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.items);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItemId) {
      dispatch(editItem({ id: editingItemId, title, description }));
    } else {
      dispatch(addItem({ title, description }));
    }
    setTitle("");
    setDescription("");
    setEditingItemId(null);
  };

  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleEdit = (item: Item) => {
    setEditingItemId(item.id);
    setTitle(item.title);
    setDescription(item.description);
  };

  // Данные для графика (пример)
  const ChartData = {
    labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    datasets: [
      {
        label: "Активность",
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Добро пожаловать в дашборд InsightBoard!</h1>
      <LineChart ChartData={ChartData} title="Активность за неделю" />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          maxWidth: "200px",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          required
        />
        <button type="submit">
          {editingItemId ? "Редактировать" : "Добавить"}
        </button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((item: Item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => handleEdit(item)}>Редактировать</button>
            <button onClick={() => handleDelete(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DashboardPage;
