<template>
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <img src="/placeholder.svg?height=40&width=40" alt="Logo" class="h-10 w-10 mr-3">
          <h1 class="text-xl font-bold text-gray-800">家纺管理系统</h1>
        </div>
        <div class="flex items-center">
          <div class="relative mr-4">
            <input 
              type="text" 
              placeholder="搜索..." 
              class="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
            <button class="absolute right-3 top-2.5">
              <search-icon class="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div class="flex items-center">
            <bell-icon class="h-5 w-5 text-gray-600 mr-4" />
            <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <user-icon class="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
</template>