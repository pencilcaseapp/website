import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Legal Notice" }];
}

export default function Home() {
  return <h1>Legal Notice</h1>;
}
