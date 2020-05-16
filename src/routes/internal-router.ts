type Router<T> = { [K in keyof T]: T[K] };

const prependUri = (prefix: string) => <T>(routerClass: T): Router<T> => {
  return Object.keys(routerClass).reduce((acc, key) => {
    const route = routerClass[key];
    return {
      ...acc,
      [key]: (...args: string[]): string => prefix + route.apply(null, args),
    };
  }, {} as Router<T>);
};

// ADMIN
class AdminAppRoutes {
  home = () => "";
  login = () => "/login";
  users = () => "/users";
  newUser = () => "/users/new";
}

const adminAppRoutes = new AdminAppRoutes();
export const adminAppRouter = prependUri("/admin")(adminAppRoutes);
