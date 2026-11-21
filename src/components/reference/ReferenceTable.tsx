import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReferenceTable({
  caption,
  headings,
  rows,
}: {
  caption: string;
  headings: string[];
  rows: string[][];
}) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableCaption className="px-3 pb-3 text-xs">
          {caption} · En pantallas pequeñas, deslizá horizontalmente.
        </TableCaption>
        <TableHeader>
          <TableRow>
            {headings.map((heading) => (
              <TableHead key={heading} className="whitespace-normal align-top">
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <TableHead
                    key={index}
                    scope="row"
                    className="font-medium whitespace-normal align-top"
                  >
                    {cell}
                  </TableHead>
                ) : (
                  <TableCell
                    key={index}
                    className="whitespace-normal align-top text-sm leading-6 text-muted-foreground"
                  >
                    {cell}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
