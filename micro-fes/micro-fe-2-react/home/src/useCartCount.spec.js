import { renderHook, act } from "@testing-library/react-hooks";

import { useCartCount } from "./useCartCount";

jest.mock("cart/cart", ()=> ({
    cart: {
        cartItems: [],
        subscribe: jest.fn(),
    }
}));

describe("useCartCount", () => {
    it("should return cart count", () => {
        const { result } = renderHook(() => useCartCount());
        expect(result.current).toBe(0);
    });
});
