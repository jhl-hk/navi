<script lang="ts">
	import type { WeatherData } from '../types.js';

	export let weatherData: WeatherData;
</script>

<div
	class="rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 p-2">
				<svg class="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					></path>
				</svg>
			</div>
			<div>
				<h2 class="text-lg font-bold text-gray-900">Weather</h2>
				<p class="text-xs text-gray-500">{weatherData.location}</p>
			</div>
		</div>
		<button class="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline"
			>View Details</button
		>
	</div>

	<!-- Current Weather -->
	<div class="mb-6 rounded-xl bg-gradient-to-r from-orange-50/50 to-transparent p-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<div class="text-4xl">{weatherData.icon}</div>
				<div>
					<div class="text-3xl font-bold text-gray-900">{weatherData.temperature}°</div>
					<div class="text-sm font-medium text-gray-600">{weatherData.condition}</div>
				</div>
			</div>
			<div class="space-y-2 text-right">
				<div class="flex items-center space-x-2 text-xs text-gray-500">
					<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
						></path>
					</svg>
					<span>Humidity {weatherData.humidity}%</span>
				</div>
				<div class="flex items-center space-x-2 text-xs text-gray-500">
					<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
						></path>
					</svg>
					<span>Wind {weatherData.windSpeed} mph</span>
				</div>
			</div>
		</div>
	</div>

	<!-- 3-Day Forecast -->
	<div>
		<h3 class="mb-3 flex items-center text-sm font-semibold text-gray-700">
			<div class="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></div>
			3-Day Forecast
		</h3>
		<div class="space-y-3">
			{#each weatherData.forecast as day}
				<div
					class="flex items-center justify-between rounded-xl p-3 transition-all duration-300 hover:bg-orange-50/30"
				>
					<div class="flex items-center space-x-3">
						<span class="text-lg">{day.icon}</span>
						<div>
							<div class="text-sm font-medium text-gray-900">{day.day}</div>
							<div class="text-xs text-gray-600">{day.condition}</div>
						</div>
					</div>
					<div class="flex items-center space-x-3 text-sm">
						<span class="font-semibold text-gray-900">{day.high}°</span>
						<span class="text-gray-500">{day.low}°</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
