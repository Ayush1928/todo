import TodosList from '@/components/TodosList';
import * as React from 'react';

interface IpageProps {
}

const page: React.FunctionComponent<IpageProps> = (props) => {
  return (
    <TodosList/>
  );
};

export default page;
