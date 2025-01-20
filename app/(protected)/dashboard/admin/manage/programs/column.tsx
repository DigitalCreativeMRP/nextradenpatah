"use client";

import { ColumnDef } from "@tanstack/table-core";
import { program } from "@prisma/client";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/TableHeaderSortable";
import { deleteManyProgramsByID } from "@/actions/programActions";
import {
  moreActionColumn,
  numberColumn,
  selectColumn,
} from "@/components/TableData";

export const columns: ColumnDef<program>[] = [
  selectColumn<program>(),
  numberColumn<program>(),
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"title"} />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSortable={false}
        title={"description"}
      />
    ),
    cell: ({ row }) => {
      return <div>{row.original.description}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"type"} />
    ),
    cell: ({ row }) => {
      const status = row.original.type;

      let statusColor = "bg-secondary";
      if (status === "DAILY") statusColor = "bg-gray-400/50";
      else if (status === "ANNUALY") statusColor = "bg-emerald-400";

      return (
        <div
          className={cn(
            "flex items-center justify-center rounded-md bg-secondary px-2 py-4",
            statusColor,
          )}
        >
          {row.original.type}
        </div>
      );
    },
  },

  moreActionColumn<program>({
    deleteFNAction: deleteManyProgramsByID,
  }),
];
