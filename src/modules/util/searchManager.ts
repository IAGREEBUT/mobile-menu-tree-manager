import sampleManagers from "../../assets/sample-managers.json";
import { managerInfo } from "../../types/dataTypes";

type SampleManagersFile = {
  managers: managerInfo[];
};

const managerData = sampleManagers as SampleManagersFile;

export function findManagerById(id: number): managerInfo | undefined {
  return managerData.managers.find((manager) => manager.id === id);
}

export function getManagerById(id: number): managerInfo {
  const manager = findManagerById(id);

  if (!manager) {
    throw new Error(`Manager with id ${id} was not found.`);
  }

  return manager;
}

export function findManagerProfileById(id: number): string | undefined {
  const manager = findManagerById(id);
  const profile = manager?.profile?.trim();

  return profile || undefined;
}
