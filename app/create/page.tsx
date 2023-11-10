import PostForm from "./components/PostForm"

export default function page() {
    const texts = ["Bring Your Vision to Life","Upload Your Masterpiece","Craft Your Story","Tag Your Skills","Connect with Collaborators","Choose Your Visibility","Celebrate Your Success"]
  return (
    <main className="flex flex-col w-full justify-start items-center min-h-full px-24 gap-12 py-12">
        <h1 className="  font-bold text-3xl">Bring Your Vision to Life</h1>
        <PostForm/>
    </main>
  )
}
