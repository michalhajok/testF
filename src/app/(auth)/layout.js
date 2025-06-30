export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            FizjoMed
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            System zarządzania placówką fizjoterapeutyczną
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
