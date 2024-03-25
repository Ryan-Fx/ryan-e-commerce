import { CartProduct } from "@/types/cart-product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: CartProduct[];
  addItemToCart: (item: CartProduct) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      addItemToCart: (item) => {
        const itemExist = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (itemExist) {
          set({
            cartItems: get().cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...itemExist, quantity: item.quantity }
                : cartItem
            ),
          });
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              { ...item, quantity: item.quantity },
            ],
          });
        }
      },

      increaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId
        );

        if (itemExists) {
          itemExists.quantity!++;
        }

        set({ cartItems: [...get().cartItems] });
      },

      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId
        );

        if (itemExists) {
          if (itemExists.quantity === 1) {
            // menyimpan semua item di cartItems saat ini, kecuali yg ada di cart yg berjumlah 1
            // If quantity is 1, remove the item from cartItems
            const updatedCartItems = get().cartItems.filter(
              (item) => item.id !== productId
            );

            set({ cartItems: updatedCartItems });
          } else {
            itemExists.quantity!--;
            set({ cartItems: [...get().cartItems] });
          }
        }
      },

      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (item) => item.id === productId
        );

        if (itemExists?.quantity) {
          itemExists!.quantity = 0;
        }

        if (itemExists) {
          const updatedCarItems = get().cartItems.filter(
            (item) => item.id !== productId
          );

          set({ cartItems: updatedCarItems });
        }
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cartItems",
    }
  )
);

export default useCartStore;
