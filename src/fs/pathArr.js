
export const getPathArr = (path) => {
  let pathArr = [];
  if (process.env.HOME) {
    pathArr = path.split('\\');
  }
  return pathArr;
}
