declare module '*.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*/*/*.jpg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*/*/*.png' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}
