import Landing from "./auth/components/Landing";

export default function Home() {
  console.log(process.env.DATABASE_URL)
  console.log("test")
  return (
    <Landing/>
  );
}
