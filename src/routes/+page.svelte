<script lang="ts">
	import { IconSearch, IconBrandGoogle, IconBrandBing, IconCalendar, IconMail, IconBrandGithub } from '@tabler/icons-svelte';

	// Sample upcoming events data
	const upcomingEvents = [
		{
			id: 1,
			title: "Tech Talk: AI & Machine Learning",
			date: "2024-01-15",
			time: "2:00 PM",
			location: "Conference Room A",
			description: "Share insights on latest AI trends and development practices",
			category: "Technology"
		},
		{
			id: 2,
			title: "Team Building Workshop",
			date: "2024-01-20",
			time: "6:00 PM",
			location: "Main Hall",
			description: "Interactive activities to strengthen team collaboration",
			category: "Team"
		},
		{
			id: 3,
			title: "Product Launch Event",
			date: "2024-01-25",
			time: "10:00 AM",
			location: "Auditorium",
			description: "Unveiling our latest product innovations",
			category: "Product"
		}
	];

	// Sample email data
	const emails = [
		{
			id: 1,
			sender: "John Doe",
			subject: "Project Progress Update",
			preview: "Here's the detailed weekly progress report for our ongoing project...",
			time: "2 hours ago",
			unread: true
		},
		{
			id: 2,
			sender: "Jane Smith",
			subject: "Meeting Schedule Confirmation",
			preview: "Tomorrow's meeting time has been confirmed, please review the agenda...",
			time: "4 hours ago",
			unread: true
		},
		{
			id: 3,
			sender: "Tech Team",
			subject: "System Maintenance Notice",
			preview: "Scheduled maintenance tonight, expected downtime 2 hours...",
			time: "1 day ago",
			unread: false
		},
		{
			id: 4,
			sender: "HR Department",
			subject: "Employee Benefits Update",
			preview: "New employee benefit policies have been published...",
			time: "2 days ago",
			unread: false
		}
	];

	// Sample GitHub data
	const githubData = {
		repositories: [
			{
				name: "navi-dashboard",
				description: "Modern navigation dashboard application",
				language: "TypeScript",
				stars: 45,
				forks: 12,
				lastUpdate: "2 days ago"
			},
			{
				name: "ui-components",
				description: "Reusable UI component library",
				language: "Svelte",
				stars: 23,
				forks: 8,
				lastUpdate: "1 week ago"
			},
			{
				name: "api-gateway",
				description: "Microservices API gateway",
				language: "Go",
				stars: 67,
				forks: 15,
				lastUpdate: "3 days ago"
			}
		],
		recentActivity: [
			{
				type: "push",
				repo: "navi-dashboard",
				branch: "main",
				message: "feat: add user authentication system",
				time: "1 hour ago"
			},
			{
				type: "pull_request",
				repo: "ui-components",
				branch: "feature/new-layout",
				message: "Update responsive design patterns",
				time: "3 hours ago"
			},
			{
				type: "issue",
				repo: "api-gateway",
				message: "Fix API response time optimization",
				time: "1 day ago"
			}
		]
	};

	let searchQuery = "";
	let currentTime = new Date();
	let greeting = "";
	let selectedEngine = "google";
	let showEngineDropdown = false;

	// Search engine configuration
	const searchEngines = [
		{
			id: "google",
			name: "Google",
			url: "https://www.google.com/search",
			icon: "google",
			color: "from-blue-500 to-blue-600"
		},
		{
			id: "bing",
			name: "Bing",
			url: "https://www.bing.com/search",
			icon: "bing",
			color: "from-green-500 to-green-600"
		},
		{
			id: "duckduckgo",
			name: "DuckDuckGo",
			url: "https://duckduckgo.com/",
			icon: "duckduckgo",
			color: "from-yellow-500 to-yellow-600"
		}
	];

	// Get current selected search engine
	$: currentEngine = searchEngines.find(engine => engine.id === selectedEngine);

	// Generate greeting based on time
	$: {
		const hour = currentTime.getHours();
		if (hour < 12) {
			greeting = "Good Morning";
		} else if (hour < 18) {
			greeting = "Good Afternoon";
		} else {
			greeting = "Good Evening";
		}
	}

	// Format date
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

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

	// Perform search
	function performSearch() {
		if (searchQuery.trim() && currentEngine) {
			const searchUrl = currentEngine.url + (currentEngine.id === 'duckduckgo' ? '?q=' : '?q=') + encodeURIComponent(searchQuery);
			window.open(searchUrl, '_blank');
		}
	}

	// Handle enter key search
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performSearch();
		}
	}

	// Click outside to close dropdown
	function handleClickOutside(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.search-engine-dropdown')) {
			showEngineDropdown = false;
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
	<!-- Decorative elements -->
	<div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
		<div class="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
		<div class="absolute top-40 right-20 w-24 h-24 bg-purple-200/40 rounded-full blur-lg animate-pulse delay-1000"></div>
		<div class="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
	</div>

	<!-- Top spacing for vertical centering -->
	<div class="h-[15vh]"></div>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
		<!-- Welcome Section -->
		<div class="text-center mb-16 animate-fade-in">
			<div class="mb-6">
				<h1 class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
					{greeting}!
				</h1>
				<div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
			</div>
			<div class="space-y-2">
				<div class="text-3xl font-light text-gray-700 tracking-wide">
					{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
				</div>
				<div class="text-xl text-gray-500 font-light">
					{currentTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
				</div>
			</div>
		</div>

		<!-- Search Section -->
		<div class="mb-20 animate-slide-up" role="button" tabindex="0" on:click={handleClickOutside} on:keydown={handleClickOutside}>
			<div class="relative max-w-4xl mx-auto">
				<div class="flex items-center bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
					<!-- Search Engine Selector -->
					<div class="relative search-engine-dropdown">
						<button
							on:click={() => showEngineDropdown = !showEngineDropdown}
							class="flex items-center space-x-4 px-8 py-6 text-base font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 border-r border-gray-200/50 rounded-l-3xl hover:bg-blue-50/50 group"
						>
							<div class="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300">
								{#if currentEngine?.icon === 'google'}
									<IconBrandGoogle class="w-5 h-5" />
								{:else if currentEngine?.icon === 'bing'}
									<IconBrandBing class="w-5 h-5" />
								{:else}
									<IconSearch class="w-5 h-5" />
								{/if}
							</div>
							<span class="font-semibold">{currentEngine?.name}</span>
							<svg class="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 {showEngineDropdown ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
							</svg>
						</button>
						
						{#if showEngineDropdown}
							<div class="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-20 overflow-hidden animate-scale-in">
								{#each searchEngines as engine}
									<button
										on:click={() => {
											selectedEngine = engine.id;
											showEngineDropdown = false;
										}}
										class="w-full flex items-center space-x-4 px-6 py-4 text-base hover:bg-blue-50 transition-all duration-200 {selectedEngine === engine.id ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500' : 'text-gray-700'} group"
									>
										<div class="p-2 rounded-lg {selectedEngine === engine.id ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'} transition-colors duration-200">
											{#if engine.icon === 'google'}
												<IconBrandGoogle class="w-5 h-5" />
											{:else if engine.icon === 'bing'}
												<IconBrandBing class="w-5 h-5" />
											{:else}
												<IconSearch class="w-5 h-5" />
											{/if}
										</div>
										<span class="font-medium">{engine.name}</span>
										{#if selectedEngine === engine.id}
											<svg class="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 24 24">
												<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
											</svg>
										{/if}
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Search Input -->
					<div class="flex-1 relative">
						<input
							bind:value={searchQuery}
							on:keypress={handleKeyPress}
							type="text"
							placeholder="Search anything..."
							class="w-full px-8 py-6 border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent text-xl font-light tracking-wide"
						/>
					</div>

					<!-- Search Button -->
					<button
						on:click={performSearch}
						class="px-8 py-6 text-gray-400 hover:text-blue-600 transition-all duration-300 rounded-r-3xl hover:bg-blue-50/50 group"
					>
						<div class="p-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
							<IconSearch class="w-6 h-6" />
						</div>
					</button>
				</div>
			</div>
		</div>

		<!-- Dashboard Cards -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
			<!-- Upcoming Events Card -->
			<div class="group bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/95 animate-slide-up stagger-1">
				<div class="flex items-center justify-between mb-10">
					<div class="flex items-center space-x-4">
						<div class="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
							<IconCalendar class="w-7 h-7 text-blue-600" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">Upcoming Events</h2>
							<p class="text-sm text-gray-500 mt-1">{upcomingEvents.length} events scheduled</p>
						</div>
					</div>
					<button class="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-50">View All</button>
				</div>
				<div class="space-y-6">
					{#each upcomingEvents as event, index}
						<div class="border-l-4 border-blue-500 pl-8 py-5 bg-gradient-to-r from-blue-50/50 to-transparent rounded-r-2xl hover:from-blue-50 hover:to-blue-25 transition-all duration-300 hover:shadow-lg hover:pl-10 animate-slide-in" style="animation-delay: {index * 100}ms">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<h3 class="font-bold text-gray-900 mb-3 text-lg hover:text-blue-900 transition-colors duration-300">{event.title}</h3>
									<p class="text-sm text-gray-600 mb-4 leading-relaxed">{event.description}</p>
									<div class="flex items-center space-x-6 text-sm text-gray-500">
										<span class="flex items-center bg-white/80 px-3 py-2 rounded-lg">
											<svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
											</svg>
											{formatDate(event.date)}
										</span>
										<span class="flex items-center bg-white/80 px-3 py-2 rounded-lg">
											<svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
											{event.time}
										</span>
									</div>
								</div>
								<span class="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 whitespace-nowrap ml-6 shadow-sm">
									{event.category}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Emails Card -->
			<div class="group bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/95 animate-slide-up stagger-2">
				<div class="flex items-center justify-between mb-10">
					<div class="flex items-center space-x-4">
						<div class="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
							<IconMail class="w-7 h-7 text-green-600" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-gray-900 group-hover:text-green-900 transition-colors duration-300">Recent Emails</h2>
							<p class="text-sm text-gray-500 mt-1">{emails.filter(e => e.unread).length} unread messages</p>
						</div>
					</div>
					<button class="text-green-600 hover:text-green-700 font-semibold text-sm hover:underline transition-all duration-300 px-4 py-2 rounded-lg hover:bg-green-50">View All</button>
				</div>
				<div class="space-y-4">
					{#each emails as email, index}
						<div class="border-b border-gray-100/50 pb-6 last:border-b-0 hover:bg-green-50/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-md -mx-5 animate-slide-in" style="animation-delay: {index * 100}ms">
							<div class="flex items-start space-x-5">
								<div class="flex-shrink-0 relative">
									<div class="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
										<span class="text-base font-bold text-white">{email.sender.charAt(0)}</span>
									</div>
									{#if email.unread}
										<div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
									{/if}
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center justify-between mb-2">
										<p class="text-base font-bold text-gray-900 truncate {email.unread ? 'text-green-900' : ''}">{email.sender}</p>
										<span class="text-xs text-gray-400 whitespace-nowrap ml-3 bg-gray-100 px-2 py-1 rounded-lg">{email.time}</span>
									</div>
									<p class="text-sm font-semibold text-gray-900 truncate mb-2 {email.unread ? 'text-green-800' : ''}">{email.subject}</p>
									<p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">{email.preview}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- GitHub Card -->
			<div class="group bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/95 animate-slide-up stagger-3">
				<div class="flex items-center justify-between mb-10">
					<div class="flex items-center space-x-4">
						<div class="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
							<IconBrandGithub class="w-7 h-7 text-purple-600" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors duration-300">GitHub</h2>
							<p class="text-sm text-gray-500 mt-1">{githubData.repositories.length} repositories</p>
						</div>
					</div>
					<button class="text-purple-600 hover:text-purple-700 font-semibold text-sm hover:underline transition-all duration-300 px-4 py-2 rounded-lg hover:bg-purple-50">View All</button>
				</div>
				
				<!-- Repositories -->
				<div class="mb-10">
					<h3 class="text-lg font-bold text-gray-700 mb-6 flex items-center">
						<div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
						Repositories
					</h3>
					<div class="space-y-5">
						{#each githubData.repositories as repo, index}
							<div class="border border-gray-200/70 rounded-2xl p-6 hover:bg-purple-50/30 transition-all duration-300 hover:border-purple-300 hover:shadow-lg animate-slide-in" style="animation-delay: {index * 100}ms">
								<div class="flex items-center justify-between mb-3">
									<h4 class="text-base font-bold text-purple-600 hover:text-purple-700 cursor-pointer transition-colors duration-300">{repo.name}</h4>
									<div class="flex items-center space-x-4 text-xs text-gray-500">
										<span class="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
											<svg class="w-3 h-3 mr-1 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
											</svg>
											{repo.stars}
										</span>
										<span class="flex items-center bg-blue-100 px-2 py-1 rounded-lg">
											<svg class="w-3 h-3 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
											</svg>
											{repo.forks}
										</span>
									</div>
								</div>
								<p class="text-sm text-gray-600 mb-4 leading-relaxed">{repo.description}</p>
								<div class="flex items-center justify-between">
									<span class="inline-flex items-center px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm">
										{repo.language}
									</span>
									<span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{repo.lastUpdate}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Recent Activity -->
				<div>
					<h3 class="text-lg font-bold text-gray-700 mb-6 flex items-center">
						<div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
						Recent Activity
					</h3>
					<div class="space-y-5">
						{#each githubData.recentActivity as activity, index}
							<div class="flex items-start space-x-4 p-4 rounded-2xl hover:bg-purple-50/30 transition-all duration-300 animate-slide-in" style="animation-delay: {index * 100}ms">
								<div class="flex-shrink-0">
									<span class="text-2xl p-2 bg-gray-100 rounded-xl shadow-sm">{getActivityIcon(activity.type)}</span>
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm text-gray-900 font-semibold truncate mb-1">{activity.message}</p>
									<div class="flex items-center space-x-3 text-xs text-gray-500">
										<span class="font-bold text-purple-600">{activity.repo}</span>
										{#if activity.branch}
											<span class="text-gray-400">•</span>
											<span class="bg-gray-100 px-2 py-1 rounded">{activity.branch}</span>
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
		</div>
	</div>
</div>

<style>
	@keyframes fade-in {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes slide-up {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes slide-in {
		from { opacity: 0; transform: translateX(-20px); }
		to { opacity: 1; transform: translateX(0); }
	}

	@keyframes scale-in {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}

	.animate-fade-in {
		animation: fade-in 0.8s ease-out;
	}

	.animate-slide-up {
		animation: slide-up 0.8s ease-out;
	}

	.animate-slide-in {
		animation: slide-in 0.6s ease-out;
	}

	.animate-scale-in {
		animation: scale-in 0.3s ease-out;
	}

	.stagger-1 { animation-delay: 0.2s; }
	.stagger-2 { animation-delay: 0.4s; }
	.stagger-3 { animation-delay: 0.6s; }

	.shadow-3xl {
		box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}
</style>