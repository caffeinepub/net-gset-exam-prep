import { useQuery } from "@tanstack/react-query";
import type { PYQ, Paper, Unit } from "../backend.d";
import { useActor } from "./useActor";

export function useGetPapers() {
  const { actor, isFetching } = useActor();
  return useQuery<Paper[]>({
    queryKey: ["papers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPapers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetUnitsByPaper(paperId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Unit[]>({
    queryKey: ["units", paperId?.toString()],
    queryFn: async () => {
      if (!actor || paperId === null) return [];
      return actor.getUnitsByPaper(paperId);
    },
    enabled: !!actor && !isFetching && paperId !== null,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetPYQsByPaper(paperId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<PYQ[]>({
    queryKey: ["pyqs", paperId?.toString()],
    queryFn: async () => {
      if (!actor || paperId === null) return [];
      return actor.getPYQsByPaper(paperId);
    },
    enabled: !!actor && !isFetching && paperId !== null,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllPYQs() {
  const { actor, isFetching } = useActor();
  return useQuery<PYQ[]>({
    queryKey: ["pyqs", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPYQs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}
