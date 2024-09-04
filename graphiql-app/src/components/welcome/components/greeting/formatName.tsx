export const formatName = (name: string) => {
  return name.length > 9 ? `${name.slice(0, 9)}...` : name;
};
