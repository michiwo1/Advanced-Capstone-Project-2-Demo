'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 5秒後に/jobsページに遷移
    const timer = setTimeout(() => {
      router.push('/jobs');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 text-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            レジュメを分析中
          </h1>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-lg text-gray-600">
              AIがあなたのレジュメを分析しています
              <br />
              <span className="text-sm opacity-75">
                このページは自動的に遷移します
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 