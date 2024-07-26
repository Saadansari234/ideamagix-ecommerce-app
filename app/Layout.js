
import React from 'react'
import Navigator from './navigations/Navigator';
import { CartProvider } from './context/CartContext';
import AuthProvider from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
const Layout = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <CartProvider>
          <Navigator />
        </CartProvider>
      </NavigationContainer>
    </AuthProvider>

  )
}
export default Layout