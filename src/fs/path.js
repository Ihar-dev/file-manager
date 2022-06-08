export const getPath = (pathArr) => {
  let path = '';
  if (process.env.HOME) path = pathArr.join('\\');
  return path;
}
