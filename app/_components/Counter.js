'use client';
import { useState } from 'react';

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div className=''>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
    </div>
  );
}
