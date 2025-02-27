<script>
    // Przykładowe filmy z TikToka (miałyby być zastąpione prawdziwymi danymi)
    const featuredVideos = [
      {
        id: 1,
        title: "Rozmowa z programistą",
        thumbnail: "https://picsum.photos/400/600?random=1",
        views: "10.5K",
        likes: "2.3K"
      },
      {
        id: 2,
        title: "Dzień z życia fryzjera",
        thumbnail: "https://picsum.photos/400/600?random=2",
        views: "8.2K",
        likes: "1.8K"
      },
      {
        id: 3,
        title: "Jak zostać grafikiem?",
        thumbnail: "https://picsum.photos/400/600?random=3",
        views: "12.7K",
        likes: "3.1K"
      }
    ];
  </script>
  
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-secondary">Najnowsze wywiady</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Sprawdź nasze najnowsze rozmowy z ludźmi wykonującymi różne zawody i poznaj ich perspektywę na rynek pracy.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each featuredVideos as video}
          <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div class="relative pb-[150%]">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 class="font-bold text-lg mb-2">{video.title}</h3>
                <div class="flex items-center text-sm space-x-4">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {video.views}
                  </span>
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {video.likes}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-4">
              <a 
                href="https://www.tiktok.com/@zapracujnaprzyszlosc" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 448 512">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
                Zobacz na TikToku
              </a>
            </div>
          </div>
        {/each}
      </div>
      
      <div class="text-center mt-12">
        <a 
          href="https://www.tiktok.com/@zapracujnaprzyszlosc" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors font-medium"
        >
          Zobacz więcej na TikToku
        </a>
      </div>
    </div>
  </section>