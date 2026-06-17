import type { InBodyScan } from "@/types";

type Props = {
  scans: InBodyScan[];
};

export default function ScanHistory({ scans }: Props) {
  if (scans.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-bg-card p-6 text-center">
        <p className="text-sm text-text-secondary">Sin scans registrados aún.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-bg-elevated text-text-muted">
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Peso</th>
              <th className="px-4 py-3 font-medium">% Grasa</th>
              <th className="px-4 py-3 font-medium">Músculo</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text-primary">
                  {new Date(scan.fecha_scan).toLocaleDateString("es-MX")}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {scan.peso != null ? `${scan.peso} kg` : "—"}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {scan.porcentaje_grasa != null ? `${scan.porcentaje_grasa}%` : "—"}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {scan.masa_muscular != null ? `${scan.masa_muscular} kg` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
