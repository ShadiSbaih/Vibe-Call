import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const PageLoader = () => {
  const{theme}=useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-16">
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-4 border-primary/30"></div>
        </div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
}

export default PageLoader