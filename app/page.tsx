import Link from "next/link";

export default function Home() {
  return (
    <main
      id="landing"
      className="flex min-h-screen flex-col gap-6 items-center justify-center p-24"
    >
      <h1 className=" text-5xl font-bold text-center ">
        {" "}
        Capturing Moments, Creating Memories!
      </h1>
      <p className=" text-lg font-medium text-center">
        Welcome to Vshoot, a platform dedicated to photographers, videographers,
        and all creative souls. Discover and share your visual artistry with the
        world.
      </p>
      <Link
        href={"/auth/signup"}
        className="my-24 text-slate-950 text-xl font-bold bg-slate-50 p-5 rounded-xl hover:bg-slate-200 transition-all"
      >
        Shoot your shot
      </Link>
    </main>
  );
}
