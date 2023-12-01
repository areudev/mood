export default function Loading() {
  return (
    <div className="flex h-[70vh] items-center justify-center gap-2">
      <p className="text-2xl ">Ai is creating your entry...</p>
      <div className="animate-bounce">
        <span className="text-2xl">🤖</span>
      </div>
    </div>
  )
}
