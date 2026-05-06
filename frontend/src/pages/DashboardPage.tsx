import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchItems, addItem, editItem, removeItem } from "../store/ItemsSlice";
import type { Item } from "../api/itemsApi";
import LineChart from "../components/Charts/LineChart";
import WelcomeMessage from "../components/Dashboard/WelcomeMessage";
import ItemForm from "../components/Dashboard/ItemForm";
import ItemList from "../components/Dashboard/ItemList";
import Layout from "../components/Layout/Layout";
import styles from "./DashboardPage.module.css";

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
    <Layout>
      <div className={styles.dashboard}>
        <WelcomeMessage />
        <div className={styles.container}>
          <div className={styles.columns}>
            <div className={styles.chartSection}>
              <h2>Графики</h2>
              <LineChart ChartData={ChartData} title="Активность за неделю" />
            </div>
          </div>

          <div className={styles.columns}>
            <div className={styles.formSection}>
              <ItemForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
                editingItemId={editingItemId}
              />
            </div>

            <div className={styles.listSection}>
              <ItemList
                items={items}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DashboardPage;
