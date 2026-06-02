import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-32 px-6">
        
        <h1 className="text-6xl font-bold text-gray-900">
          Crack Your Interviews with AI
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Practice mock interviews, receive AI-powered feedback,
          and improve your technical and HR interview skills.
        </p>

        <button className="mt-10 bg-black text-white px-8 py-4 rounded-xl text-lg hover:bg-gray-800 transition">
          Start Interview
        </button>

      </div>
    </div>
  );
}

export default Home;