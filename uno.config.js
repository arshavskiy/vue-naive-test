import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({
      getCSS: () => `
        :root {
              --n-item-text-color-active: #2c2e30
        }
      `,
    }), // Basic utilities
    presetAttributify(), // Attribute-mode support (e.g., text="red")
    presetIcons() // Icon support
  ],
  // Optional: Add custom rules, shortcuts, or variants
  // rules: [
  //   ['custom-rule', { color: 'blue', 'font-size': '18px' }]
  // ],
  // shortcuts: {
  //   'btn': 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700',
  // }
});
