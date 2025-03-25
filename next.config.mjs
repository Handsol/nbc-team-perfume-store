import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**'
      },
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default withPlaiceholder(nextConfig);
