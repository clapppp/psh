import dynamic from "next/dynamic";
import Loading from "./loading";

const components = [
  "./ui/playground",
  "./ui/playground",
  "./ui/playground",
  "./ui/playground",
  "./ui/playground",
  "./ui/cosmos",
];

function importTarget(rand: number) {
  let target: string;
  target = components[rand];
  return target;
}

const Content = dynamic(() => import('./ui/playground'), {
  loading: () => (
    <Loading />),
  ssr: false,
})
export default function Home() {
  return <Content />;
}
