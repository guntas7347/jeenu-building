import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default async function AdminPropertiesPage() {
  // const properties = await getAllProperties();
  const properties: any = [];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            Properties
          </h1>
          <p className="text-on-surface-variant mt-1">
            Manage all your listed properties.
          </p>
        </div>
        <Link
          href="/admin/dashboard/properties/new"
          className="btn-admin flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Property
        </Link>
      </header>

      <div className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/10">
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Property
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Location
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Price
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Status
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-on-surface-variant"
                >
                  No properties found. Create one.
                </td>
              </tr>
            ) : (
              properties.map((prop: any) => (
                <tr
                  key={prop.id}
                  className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors"
                >
                  <td className="px-6 py-4 text-on-surface font-medium">
                    {prop.title}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">
                    {prop.location}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">
                    {prop.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        prop.status === "Active"
                          ? "bg-primary/20 text-primary"
                          : prop.status === "Featured"
                            ? "bg-gradient-gold text-on-primary"
                            : "bg-outline-variant/20 text-on-surface-variant"
                      }`}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/dashboard/properties/${prop.id}`}
                      className="inline-flex p-2 bg-surface-container-high rounded text-on-surface hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <form
                      // action={deleteProperty.bind(null, prop.id)}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="inline-flex p-2 bg-surface-container-high rounded text-error hover:bg-error/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
