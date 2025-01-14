"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProgramCard } from "@/components/ProgramCard";
import { getProgramsAction } from "@/actions/programActions";
import {
  ErrorMessage,
  ProgramListLoading,
  ProgramListWrapper,
} from "@/components/ProgramUtils";
import { Program } from "@/types/Program";

interface ProgramListProps {
  title: string;
  subtitle: string;
  type: "DAILY" | "ANNUALY";
  numberItemShown?: number | "all";
  showMoreOption?: boolean;
}

const ProgramList = ({
  programs,
  title,
  subtitle,
  showMoreOption,
}: {
  programs: Program[];
  title: string;
  subtitle: string;
  showMoreOption?: boolean;
}) => (
  <ProgramListWrapper title={title} subtitle={subtitle}>
    {programs.map((program) => (
      <div key={program.id} className="flex flex-col gap-7">
        <ProgramCard {...program} />
      </div>
    ))}
    {showMoreOption && <div>Show More Option Placeholder</div>}
  </ProgramListWrapper>
);

export const ProgramRender = ({
  title,
  subtitle,
  type,
  showMoreOption,
  numberItemShown = 3,
}: ProgramListProps) => {
  const { data: programs, status } = useQuery({
    queryKey: ["programs", type, numberItemShown],
    queryFn: () => getProgramsAction(type, numberItemShown),
  });

  if (status === "pending") {
    return (
      <ProgramListWrapper title={title} subtitle={subtitle}>
        <ProgramListLoading />
      </ProgramListWrapper>
    );
  }

  if (status === "error") {
    return (
      <ErrorMessage
        title={title}
        subtitle={subtitle}
        message="Terjadi kesalahan, coba lagi nanti"
      />
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <ErrorMessage
        title={title}
        subtitle={subtitle}
        message="Belum ada program yang akan datang dalam waktu dekat ini"
      />
    );
  }

  return (
    <ProgramList
      programs={programs}
      title={title}
      subtitle={subtitle}
      showMoreOption={showMoreOption}
    />
  );
};
