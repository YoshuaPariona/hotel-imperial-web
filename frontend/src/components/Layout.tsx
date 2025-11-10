

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
  );
}
