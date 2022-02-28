module.exports = {
  presets: [require.resolve("next/babel")],
  plugins: [["styled-components", { ssr: true }]],
};
