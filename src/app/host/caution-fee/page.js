// app/hello/page.js
export default function HelloPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Hello World!</h1>
        <p className="text-lg text-gray-600">
          Welcome to your simple Next.js page
        </p>
      </div>
    </div>
  );
}