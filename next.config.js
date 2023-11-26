const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.dummyjson.com', 'http://localhost:3000/'],
  },
    experimental: {
      forceSwcTransforms: true,
    },
}

module.exports = nextConfig
