import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { $Enums } from "@prisma/client";
import UserRole = $Enums.UserRole;
import { cn, mapEnum } from "@/lib/utils";
import { updateUserRole } from "@/actions/user";
import { toast } from "@/hooks/use-toast";

interface Props {
  role: UserRole;
  userId: string;
}

export function getRoleBgColor(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "bg-rose-400/50 hover:bg-rose-400/75 active:bg-rose-400";
    case "DC":
      return "bg-fuchsia-400/50 hover:bg-fuchsia-400/75 active:bg-fuchsia-400";
    case "PTQ":
      return "bg-emerald-400/50 hover:bg-emerald-400/75 active:bg-emerald-400";
    case "UMAR":
      return "bg-sky-400/50 hover:bg-sky-400/75 active:bg-sky-400";
    case "IMC":
      return "bg-violet-400/50 hover:bg-violet-400/75 active:bg-violet-400";
    case "TAKMIR":
      return "bg-yellow-400/50 hover:bg-yellow-400/75 active:bg-yellow-400";
    case "JAMAAH":
      return "bg-rose-400/50 hover:bg-rose-400/75 active:bg-rose-400";
  }
}

const DropdownRole = ({ role, userId }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "!size-full grow justify-center p-0 py-4 text-black",
            getRoleBgColor(role),
          )}
        >
          {role}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={"space-y-2"}>
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        {mapEnum(UserRole, (key, value) => (
          <DropdownMenuItem
            key={key}
            className={getRoleBgColor(key)}
            onClick={() => {
              updateUserRole(userId, key).then((response) => {
                if (response.error) {
                  toast({
                    title: "Error",
                    description: response.error,
                    variant: "destructive",
                  });
                } else if (response.success) {
                  toast({
                    title: "Congratulations!!! Success updating role",
                    description: response.success,
                  });
                }
              });
            }}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownRole;
