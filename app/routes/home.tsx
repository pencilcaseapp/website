import { href, Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "pencil case" }];
}

export default function Home() {
  return (
    <>
      <h1>pencil case</h1>
      <Link to={href("/legal-notice")}>Go to legal notice</Link>
    </>
  );
}
