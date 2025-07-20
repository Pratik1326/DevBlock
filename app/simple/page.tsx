export default function SimplePage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          ✅ Simple Test Page
        </h1>
        <p className="text-gray-700 mb-4">
          If you can see this styled content, the application is working!
        </p>
        <div className="space-y-2">
          <div className="p-2 bg-green-100 text-green-800 rounded">
            ✅ Tailwind CSS is working
          </div>
          <div className="p-2 bg-blue-100 text-blue-800 rounded">
            ✅ Next.js is working
          </div>
          <div className="p-2 bg-purple-100 text-purple-800 rounded">
            ✅ React is working
          </div>
        </div>
        <a 
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  )
} 