import { getAllSolutions } from "./get-all-solutions";

export const solutionNameToId = async (
  solutionName: string,
  accessToken: string
) => {
  const solutions = await getAllSolutions(accessToken).then((res) => res);
  const sol = solutions
    .filter((el: { delete_date: null }) => el.delete_date === null)
    .find((el: { name: string }) => el.name === solutionName);
  return sol.id;
};
