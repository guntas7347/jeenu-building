const FormTextarea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-1.5">
      {label}
    </label>
    <textarea
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 min-h-[120px]"
      {...props}
    />
  </div>
);

export default FormTextarea;
