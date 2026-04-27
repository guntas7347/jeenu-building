export function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto text-center border-t border-slate-200">
      <p className="text-xs font-medium text-slate-400">
        &copy; {year} EstateElite Admin Dashboard. All rights reserved.
      </p>
    </footer>
  );
}
