export const saveLastRoute = (path) => {
  localStorage.setItem('lastRoute', path);
};

export const getLastRoute = () => {
  return localStorage.getItem('lastRoute') || '/';
};
