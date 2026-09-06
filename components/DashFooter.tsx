export function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto text-center border-t border-slate-200 dark:border-slate-800">
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
        &copy; {year} Red Owl Homes Admin Dashboard. All rights reserved.
      </p>
    </footer>
  );
}
