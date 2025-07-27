<script lang="ts">
	import { IconSearch, IconBrandGoogle, IconBrandBing } from '@tabler/icons-svelte';
	import type { SearchEngine } from '../types.js';

	export let searchEngines: SearchEngine[] = [];
	export let selectedEngine = 'google';

	let searchQuery = '';
	let showEngineDropdown = false;
	let dropdownTimeout: number;

	// Get current selected search engine
	$: currentEngine = searchEngines.find((engine) => engine.id === selectedEngine);

	// Perform search
	function performSearch() {
		if (searchQuery.trim() && currentEngine) {
			const searchUrl =
				currentEngine.url +
				(currentEngine.id === 'duckduckgo' ? '?q=' : '?q=') +
				encodeURIComponent(searchQuery);
			window.open(searchUrl, '_blank');
		}
	}

	// Handle enter key search
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performSearch();
		}
	}

	// Handle dropdown hover with delay
	function showDropdown() {
		clearTimeout(dropdownTimeout);
		showEngineDropdown = true;
	}

	function hideDropdown() {
		dropdownTimeout = setTimeout(() => {
			showEngineDropdown = false;
		}, 300); // 300ms delay
	}
</script>

<!-- Search Section -->
<div class="relative z-40 mb-12">
	<div class="relative mx-auto max-w-3xl">
		<div
			class="flex items-center rounded-2xl border border-white/30 bg-white/90 shadow-xl backdrop-blur-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/20"
		>
			<!-- Search Engine Selector -->
			<div
				class="search-engine-dropdown relative"
				role="group"
				on:mouseenter={showDropdown}
				on:mouseleave={hideDropdown}
			>
				<button
					class="flex items-center space-x-3 rounded-l-2xl border-r border-gray-200/50 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50/50 hover:text-gray-900"
				>
					<div class="rounded-lg bg-gray-100 p-1.5">
						{#if currentEngine?.icon === 'google'}
							<IconBrandGoogle class="h-4 w-4" />
						{:else if currentEngine?.icon === 'bing'}
							<IconBrandBing class="h-4 w-4" />
						{:else}
							<IconSearch class="h-4 w-4" />
						{/if}
					</div>
					<span class="text-sm">{currentEngine?.name}</span>
				</button>

				{#if showEngineDropdown}
					<div
						class="absolute top-full left-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200/50 bg-white/95 shadow-xl backdrop-blur-lg"
					>
						{#each searchEngines as engine}
							<button
								on:click={() => {
									selectedEngine = engine.id;
									clearTimeout(dropdownTimeout);
									showEngineDropdown = false;
								}}
								class="flex w-full items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-blue-50 {selectedEngine ===
								engine.id
									? 'bg-blue-50 text-blue-700'
									: 'text-gray-700'}"
							>
								<div
									class="rounded-lg p-1.5 {selectedEngine === engine.id
										? 'bg-blue-100'
										: 'bg-gray-100'} transition-colors duration-200"
								>
									{#if engine.icon === 'google'}
										<IconBrandGoogle class="h-4 w-4" />
									{:else if engine.icon === 'bing'}
										<IconBrandBing class="h-4 w-4" />
									{:else}
										<IconSearch class="h-4 w-4" />
									{/if}
								</div>
								<span class="font-medium">{engine.name}</span>
								{#if selectedEngine === engine.id}
									<svg
										class="ml-auto h-4 w-4 text-blue-600"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
									</svg>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Search Input -->
			<input
				bind:value={searchQuery}
				on:keypress={handleKeyPress}
				type="text"
				placeholder="Search anything..."
				class="flex-1 border-0 bg-transparent px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
			/>

			<!-- Search Button -->
			<button
				on:click={performSearch}
				class="rounded-r-2xl px-4 py-3 text-gray-400 transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-600"
			>
				<IconSearch class="h-5 w-5" />
			</button>
		</div>
	</div>
</div>
