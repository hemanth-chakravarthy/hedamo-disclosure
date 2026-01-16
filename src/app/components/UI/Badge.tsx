export default function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Draft: "bg-slate-100 text-slate-600 border-slate-200",
    Submitted: "bg-blue-50 text-blue-700 border-blue-100",
    Published: "bg-emerald-50 text-emerald-700 border-emerald-100"
  };

  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${styles[status]}`}>
      {status === 'Published' ? 'Disclosure Published' : status}
    </span>
  );
}