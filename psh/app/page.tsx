import dynamic from "next/dynamic";

const listsCom = [
  "./ui/playground",
  "./ui/playground",
  "./ui/playground",
  "./ui/playground",
  "./ui/playground",
  "./ui/cosmos",
];
const listsMob = [
  "./ui/cosmos",
  "./ui/cosmos",
  "./ui/cosmos",
  "./ui/cosmos",
  "./ui/cosmos",
  "./ui/cosmos",
];

function importTarget(rand: number) {
  let target: string;
  target = listsCom[rand];
  return target;
}
const Content = dynamic(() => import('./ui/playground'), {
  loading: () => (
    <div
      className='grid place-content-center bg-white h-screen w-screen'
    >
      <p>loading...</p>
    </div>),
  ssr: false,
})
export default function Home() {
  
  return <Content />;
}
