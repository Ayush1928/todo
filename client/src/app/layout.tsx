import React from 'react';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TodoRefetch from '@/Context/TodoFunctions';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ToDoGo',
  description: 'Todo app developed using Nextjs, Tailwind, Typescript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TodoRefetch>
        <Toaster position='top-center'/>
        <body className={inter.className}>
          {children}
        </body>
      </TodoRefetch>
    </html>
  );
}
