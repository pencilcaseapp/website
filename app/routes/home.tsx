import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "pencil case" }];
}

export default function Home() {
  return <h1>pencil case</h1>;
}
