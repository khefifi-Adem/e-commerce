import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropDownLink from './DropDownLink';

export default function Header() {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <header>
      <nav className="flex h-12 items-center px-4 justify-between shadow-md">
        <Link href="/">
          <a className="text-lg font-bold">Commerce</a>
        </Link>
        <div>
          <Link href="/cart">
            <a className="p-2">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>
          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-blue-600">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                <Menu.Item>
                  <DropDownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropDownLink>
                </Menu.Item>

                <Menu.Item>
                  <DropDownLink className="dropdown-link" href="/order-history">
                    Order History
                  </DropDownLink>
                </Menu.Item>

                <Menu.Item>
                  <a
                    className="dropdown-link"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
