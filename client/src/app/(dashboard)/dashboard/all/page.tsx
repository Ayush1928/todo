"use client"
import AddTodo from '@/components/AddTodo';
import TodosList from '@/components/TodosList';
import { useState } from 'react';

interface IpageProps {
}

const page: React.FunctionComponent<IpageProps> = (props) => {

  return (
    <>
      <TodosList/>
    </>
  );
};

export default page;
