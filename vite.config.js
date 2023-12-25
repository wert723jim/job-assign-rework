import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		Components({
			dirs: ['src/components'],
			extensions: ['vue'],
			dts: 'src/components.d.ts',
			directoryAsNamespace: true
		}),
		AutoImport({
			dts: true,
			imports: ['vue', 'vue-router'],
			include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
			eslintrc: {
				enabled: true // @default false
			}
		}),
	],


	// base: '/job-assign/',
	resolve: {
		// 配置路径别名
		alias: {
			'@': '/src',
			'@assets': '/assets',
			'@utils': '/utils'
		},
	},
	server: {
		proxy: {
			'/api': {
				target: process.env.VITE_BACKEND_HOST + '/api',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''),
				headers: {
					'Content-Type': 'application/json'
				}
			},
		},
	},
})
