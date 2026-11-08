/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [{ source: '/typing-test', destination: '/typing-test/index.html' }];
  },
};
