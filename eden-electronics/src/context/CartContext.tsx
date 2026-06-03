import React, { createContext, useContext, useState, useCallback } from 'react'
import type { CartItem, Product } from '../types'
import { finalPrice, WHATSAPP_NUMBER } from '../data/products'

interface CartContextType {
  cart: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (productId: number) => void
  updateQty: (productId: number, qty: number) => void
  clearCart: () => void
  checkoutWhatsApp: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => setCart(prev => prev.filter(i => i.id !== id)), [])

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) return
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + finalPrice(i) * i.qty, 0)

  const checkoutWhatsApp = useCallback(() => {
    if (!cart.length) return
    let msg = 'Hello Eden Electronics! I would like to order:\n\n'
    cart.forEach(i => { msg += `• ${i.name} × ${i.qty} — KES ${(finalPrice(i) * i.qty).toLocaleString()}\n` })
    msg += `\nTotal: KES ${totalPrice.toLocaleString()}\n\nPlease confirm availability and payment. Thank you! 🙏`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }, [cart, totalPrice])

  return (
    <CartContext.Provider value={{ cart, totalItems, totalPrice, addToCart, removeFromCart, updateQty, clearCart, checkoutWhatsApp }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
