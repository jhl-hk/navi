<script lang="ts">
	import { IconCalendar } from '@tabler/icons-svelte';
	import type { Event } from '../types.js';

	export let events: Event[] = [];

	// Format date
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<div
	class="rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-2">
				<IconCalendar class="h-5 w-5 text-blue-600" />
			</div>
			<div>
				<h2 class="text-lg font-bold text-gray-900">Upcoming Events</h2>
				<p class="text-xs text-gray-500">{events.length} events scheduled</p>
			</div>
		</div>
		<button class="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
			>View All</button
		>
	</div>
	<div class="space-y-4">
		{#each events as event}
			<div
				class="rounded-r-xl border-l-3 border-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent py-3 pl-4 transition-all duration-300 hover:from-blue-50"
			>
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<h3 class="mb-2 text-sm font-semibold text-gray-900">{event.title}</h3>
						<p class="mb-3 text-xs leading-relaxed text-gray-600">{event.description}</p>
						<div class="flex items-center space-x-3 text-xs text-gray-500">
							<span class="flex items-center rounded-md bg-white/80 px-2 py-1">
								<svg
									class="mr-1 h-3 w-3 text-blue-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
								{formatDate(event.date)}
							</span>
							<span class="flex items-center rounded-md bg-white/80 px-2 py-1">
								<svg
									class="mr-1 h-3 w-3 text-blue-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								{event.time}
							</span>
						</div>
					</div>
					<span
						class="ml-3 inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-2 py-1 text-xs font-medium whitespace-nowrap text-blue-800"
					>
						{event.category}
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>
