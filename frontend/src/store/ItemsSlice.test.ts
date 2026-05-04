import { describe, it, expect } from "vitest";
import itemsReducer, {
  fetchItems,
  addItem,
  editItem,
  removeItem,
} from "./ItemsSlice";
import type { ItemState } from "./ItemsSlice";

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

describe("ItemsSlice", () => {
  it("should handle fetchItems.fulfilled", () => {
    const items = [
      { id: 1, name: "Тест 1", description: "Описание 1" },
      { id: 2, name: "Тест 2", description: "Описание 2" },
    ];

    const action = { type: fetchItems.fulfilled.type, payload: items };

    const newState = itemsReducer(initialState, action);

    expect(newState.items).toEqual(items);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });

  it("should handle addItem.fulfilled", () => {
    const newItem = { id: 3, name: "Тест 3", description: "Описание 3" };
    const action = { type: addItem.fulfilled.type, payload: newItem };

    const newState = itemsReducer(initialState, action);

    expect(newState.items).toContain(newItem);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });

  it("should handle editItem.fulfilled", () => {
    const existingItem = {
      id: 1,
      userId: 1,
      title: "Тест 1",
      description: "Описание 1",
    };
    const updatedItem = {
      id: 1,
      userId: 1,
      title: "Тест 1 - обновлено",
      description: "Описание 1 - обновлено",
    };
    const action = { type: editItem.fulfilled.type, payload: updatedItem };

    const newState = itemsReducer(
      { ...initialState, items: [existingItem] },
      action,
    );

    expect(newState.items).toContainEqual(updatedItem);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });

  it("should handle removeItem.fulfilled", () => {
    const itemToRemove = {
      id: 1,
      userId: 1,
      title: "Тест 1",
      description: "Описание 1",
    };
    const action = {
      type: removeItem.fulfilled.type,
      payload: undefined,
      meta: { arg: itemToRemove.id },
    };

    const newState = itemsReducer(
      { ...initialState, items: [itemToRemove] },
      action,
    );

    expect(newState.items).not.toContainEqual(itemToRemove);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });
});
