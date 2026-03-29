export const endpoint = {
  auth: {
    login: 'auth/login',
    me: 'auth/me',
  },
  products: {
    list: 'products',
    search: 'products/search',
    single: (id: number) => `products/${id}`,
    categories: 'products/categories',
    category: (category: string) => `products/category/${category}`,
  },
}
