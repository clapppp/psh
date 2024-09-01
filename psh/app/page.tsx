import dynamic from "next/dynamic";

const now = new Date();
const index = Math.floor(now.getMinutes() / 10); //0~5
const lists = [
  './ui/playground',
  './ui/playground',
  './ui/playground',
  './ui/playground',
  './ui/playground',
  './ui/playground'
]

const Content = dynamic(() => import(`${lists[index]}`), {
  loading: () => <p>loading...</p>,
  ssr: true
})

export default function Home() {
  return (
    <Content />
  );
}
