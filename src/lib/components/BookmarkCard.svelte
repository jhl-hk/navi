<script lang="ts">
	import type { Bookmark } from '../types.js';

	export let bookmarks: Bookmark[] = [];

	// Group bookmarks by category
	$: groupedBookmarks = bookmarks.reduce(
		(groups, bookmark) => {
			const category = bookmark.category;
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(bookmark);
			return groups;
		},
		{} as Record<string, Bookmark[]>
	);

	function openBookmark(url: string) {
		window.open(url, '_blank');
	}
</script>

<div
	class="rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 p-2">
				<svg class="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
					></path>
				</svg>
			</div>
			<div>
				<h2 class="text-lg font-bold text-gray-900">Bookmarks</h2>
				<p class="text-xs text-gray-500">{bookmarks.length} saved sites</p>
			</div>
		</div>
		<button class="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
			>Manage</button
		>
	</div>

	<div class="space-y-4">
		{#each Object.entries(groupedBookmarks) as [category, categoryBookmarks]}
			<div>
				<h3 class="mb-3 flex items-center text-sm font-semibold text-gray-700">
					<div class="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
					{category}
				</h3>
				<div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
					{#each categoryBookmarks as bookmark}
						<button
							on:click={() => openBookmark(bookmark.url)}
							class="flex items-center space-x-3 rounded-xl border border-gray-200/70 p-3 text-left transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/30 hover:shadow-sm"
						>
							<div class="flex-shrink-0">
								<span class="text-lg">{bookmark.icon}</span>
							</div>
							<div class="min-w-0 flex-1">
								<div class="truncate text-sm font-medium text-gray-900">{bookmark.title}</div>
								{#if bookmark.description}
									<div class="truncate text-xs text-gray-500">{bookmark.description}</div>
								{/if}
							</div>
							<div class="flex-shrink-0">
								<svg
									class="h-3 w-3 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									></path>
								</svg>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
