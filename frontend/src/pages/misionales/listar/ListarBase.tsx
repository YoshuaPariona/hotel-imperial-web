import React from 'react';

interface ListarBaseProps {
  title: string;
  children: React.ReactNode;
}

export default function ListarBase({ title, children }: ListarBaseProps) {
  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">{title}</h1>
      {children}
    </div>
  );
}