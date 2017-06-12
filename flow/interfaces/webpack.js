// @flow
declare var module: {
  hot: {
    accept(dependency: string, callback: () => void): void,
    dispose(callback: (data: Object) => void): void,
  },
};
