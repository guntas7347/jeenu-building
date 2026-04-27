const FormSelect = ({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
}) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-1.5">
      {label}
    </label>
    <select
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 appearance-none cursor-pointer"
      {...props}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
