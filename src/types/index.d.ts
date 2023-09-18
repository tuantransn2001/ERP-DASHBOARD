declare global {
  interface Window {
    myLine: Chart<keyof ChartTypeRegistry, number[], string>;
  }
}

export {};
