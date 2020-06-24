import { createSelector } from "reselect";

const selecDirectory = state => state.directory;

export const selecDirectorySections = createSelector(
  [selecDirectory],
  directory => directory.sections
);
