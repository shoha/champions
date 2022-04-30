const { exec } = require("child_process");
const { promisify } = require("util");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.xml/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = async () => {
  const execPr = promisify(exec);
  const setupOutput = await execPr("./startup.sh");
  console.log(setupOutput);

  return nextConfig;
};
