/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design",
    "antd",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "@ant-design/icons",
    "rc-input", // 添加 rc-input 到这里
  ],
};

module.exports = nextConfig;