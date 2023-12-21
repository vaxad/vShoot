import PostForm from "./components/PostForm"

export default function Page() {
    const texts = ["Bring Your Vision to Life","Upload Your Masterpiece","Craft Your Story","Tag Your Skills","Connect with Collaborators","Choose Your Visibility","Celebrate Your Success"]
  return (
    <main className="flex flex-col w-full justify-start items-center min-h-full px-6 md:px-12 lg:px-24 gap-12 py-12">
        <h1 className="  font-bold text-3xl text-center">Bring Your Vision to Life</h1>
        <PostForm/>
    </main>
  )
}
