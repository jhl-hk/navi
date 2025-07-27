<script lang="ts">
	import { IconBrandGithub } from '@tabler/icons-svelte';
	import type { GitHubData } from '../types.js';

	export let githubData: GitHubData;

	// Get activity type icon
	function getActivityIcon(type: string) {
		switch (type) {
			case 'push':
				return '📤';
			case 'pull_request':
				return '🔀';
			case 'issue':
				return '🐛';
			default:
				return '📝';
		}
	}
</script>

<div
	class="rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 p-2">
				<IconBrandGithub class="h-5 w-5 text-purple-600" />
			</div>
			<div>
				<h2 class="text-lg font-bold text-gray-900">GitHub</h2>
				<p class="text-xs text-gray-500">{githubData.repositories.length} repositories</p>
			</div>
		</div>
		<button class="text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline"
			>View All</button
		>
	</div>

	<!-- Repositories -->
	<div class="mb-6">
		<h3 class="mb-3 flex items-center text-sm font-semibold text-gray-700">
			<div class="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
			Repositories
		</h3>
		<div class="space-y-3">
			{#each githubData.repositories as repo}
				<div
					class="rounded-xl border border-gray-200/70 p-4 transition-all duration-300 hover:bg-purple-50/30"
				>
					<div class="mb-2 flex items-center justify-between">
						<h4 class="text-sm font-semibold text-purple-600">{repo.name}</h4>
						<div class="flex items-center space-x-2 text-xs text-gray-500">
							<span class="flex items-center rounded bg-yellow-100 px-1.5 py-0.5">
								<svg
									class="mr-1 h-2.5 w-2.5 text-yellow-600"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								{repo.stars}
							</span>
							<span class="flex items-center rounded bg-blue-100 px-1.5 py-0.5">
								<svg class="mr-1 h-2.5 w-2.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
									/>
								</svg>
								{repo.forks}
							</span>
						</div>
					</div>
					<p class="mb-3 text-xs text-gray-600">{repo.description}</p>
					<div class="flex items-center justify-between">
						<span
							class="inline-flex items-center rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 text-xs font-medium text-gray-800"
						>
							{repo.language}
						</span>
						<span class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400"
							>{repo.lastUpdate}</span
						>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Recent Activity -->
	<div>
		<h3 class="mb-3 flex items-center text-sm font-semibold text-gray-700">
			<div class="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
			Recent Activity
		</h3>
		<div class="space-y-3">
			{#each githubData.recentActivity as activity}
				<div
					class="flex items-start space-x-3 rounded-xl p-3 transition-all duration-300 hover:bg-purple-50/30"
				>
					<div class="flex-shrink-0">
						<span class="rounded-lg bg-gray-100 p-1.5 text-lg"
							>{getActivityIcon(activity.type)}</span
						>
					</div>
					<div class="min-w-0 flex-1">
						<p class="mb-1 truncate text-xs font-medium text-gray-900">{activity.message}</p>
						<div class="flex items-center space-x-2 text-xs text-gray-500">
							<span class="font-medium text-purple-600">{activity.repo}</span>
							{#if activity.branch}
								<span class="text-gray-400">•</span>
								<span class="rounded bg-gray-100 px-1.5 py-0.5">{activity.branch}</span>
							{/if}
							<span class="text-gray-400">•</span>
							<span>{activity.time}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
