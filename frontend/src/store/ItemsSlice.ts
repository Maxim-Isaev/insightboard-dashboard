import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getItems, createItem, updateItem, deleteItem } from "../api/itemsApi";
import type { Item } from "../api/itemsApi";

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  return await getItems();
});

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ title, description }: { title: string; description: string }) => {
    return await createItem(title, description);
  },
);

export const editItem = createAsyncThunk(
  "items/editItem",
  async ({
    id,
    title,
    description,
  }: {
    id: number;
    title: string;
    description: string;
  }) => {
    return await updateItem(id, title, description);
  },
);

export const removeItem = createAsyncThunk(
  "items/removeItem",
  async (id: number) => {
    return await deleteItem(id);
  },
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      .addCase(addItem.pending, (state) => {
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add item";
      })
      .addCase(editItem.pending, (state) => {
        state.error = null;
      })
      .addCase(editItem.fulfilled, (state, action: PayloadAction<Item>) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editItem.rejected, (state, action) => {
        state.error = action.error.message || "Failed to edit item";
      })
      .addCase(removeItem.pending, (state) => {
        state.error = null;
      })
      .addCase(
        removeItem.fulfilled,
        (state, action: PayloadAction<void, string, { arg: number }>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.meta.arg,
          );
        },
      )
      .addCase(removeItem.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete item";
      });
  },
});

export const { clearError } = itemsSlice.actions;
export default itemsSlice.reducer;
