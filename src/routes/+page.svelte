<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import EmailCard from '$lib/components/EmailCard.svelte';
	import GitHubCard from '$lib/components/GitHubCard.svelte';
	import BookmarkCard from '$lib/components/BookmarkCard.svelte';
	import type {
		SearchEngine,
		Event,
		Email,
		GitHubData,
		WeatherData,
		Bookmark,
		UptimeStatus
	} from '$lib/types.js';

	// Sample upcoming events data
	const upcomingEvents: Event[] = [
		{
			id: 1,
			title: 'Tech Talk: AI & Machine Learning',
			date: '2024-01-15',
			time: '2:00 PM',
			location: 'Conference Room A',
			description: 'Share insights on latest AI trends and development practices',
			category: 'Technology'
		},
		{
			id: 2,
			title: 'Team Building Workshop',
			date: '2024-01-20',
			time: '6:00 PM',
			location: 'Main Hall',
			description: 'Interactive activities to strengthen team collaboration',
			category: 'Team'
		},
		{
			id: 3,
			title: 'Product Launch Event',
			date: '2024-01-25',
			time: '10:00 AM',
			location: 'Auditorium',
			description: 'Unveiling our latest product innovations',
			category: 'Product'
		}
	];

	// Sample email data
	const emails: Email[] = [
		{
			id: 1,
			sender: 'John Doe',
			subject: 'Project Progress Update',
			preview: "Here's the detailed weekly progress report for our ongoing project...",
			time: '2 hours ago',
			unread: true
		},
		{
			id: 2,
			sender: 'Jane Smith',
			subject: 'Meeting Schedule Confirmation',
			preview: "Tomorrow's meeting time has been confirmed, please review the agenda...",
			time: '4 hours ago',
			unread: true
		},
		{
			id: 3,
			sender: 'Tech Team',
			subject: 'System Maintenance Notice',
			preview: 'Scheduled maintenance tonight, expected downtime 2 hours...',
			time: '1 day ago',
			unread: false
		},
		{
			id: 4,
			sender: 'HR Department',
			subject: 'Employee Benefits Update',
			preview: 'New employee benefit policies have been published...',
			time: '2 days ago',
			unread: false
		}
	];

	// Sample GitHub data
	const githubData: GitHubData = {
		repositories: [
			{
				name: 'navi-dashboard',
				description: 'Modern navigation dashboard application',
				language: 'TypeScript',
				stars: 45,
				forks: 12,
				lastUpdate: '2 days ago'
			},
			{
				name: 'ui-components',
				description: 'Reusable UI component library',
				language: 'Svelte',
				stars: 23,
				forks: 8,
				lastUpdate: '1 week ago'
			},
			{
				name: 'api-gateway',
				description: 'Microservices API gateway',
				language: 'Go',
				stars: 67,
				forks: 15,
				lastUpdate: '3 days ago'
			}
		],
		recentActivity: [
			{
				type: 'push',
				repo: 'navi-dashboard',
				branch: 'main',
				message: 'feat: add user authentication system',
				time: '1 hour ago'
			},
			{
				type: 'pull_request',
				repo: 'ui-components',
				branch: 'feature/new-layout',
				message: 'Update responsive design patterns',
				time: '3 hours ago'
			},
			{
				type: 'issue',
				repo: 'api-gateway',
				message: 'Fix API response time optimization',
				time: '1 day ago'
			}
		]
	};

	// Sample weather data
	const weatherData: WeatherData = {
		location: 'San Francisco, CA',
		temperature: 72,
		condition: 'Partly Cloudy',
		icon: '⛅',
		humidity: 65,
		windSpeed: 8,
		forecast: [
			{
				day: 'Tomorrow',
				high: 75,
				low: 58,
				condition: 'Sunny',
				icon: '☀️'
			},
			{
				day: 'Friday',
				high: 70,
				low: 55,
				condition: 'Cloudy',
				icon: '☁️'
			},
			{
				day: 'Saturday',
				high: 68,
				low: 52,
				condition: 'Light Rain',
				icon: '🌧️'
			}
		]
	};

	// Sample bookmark data
	const bookmarks: Bookmark[] = [
		{
			id: 1,
			title: 'GitHub',
			url: 'https://github.com',
			icon: '🐙',
			description: 'Code repositories',
			category: 'Development'
		},
		{
			id: 2,
			title: 'Stack Overflow',
			url: 'https://stackoverflow.com',
			icon: '🔧',
			description: 'Programming Q&A',
			category: 'Development'
		},
		{
			id: 3,
			title: 'YouTube',
			url: 'https://youtube.com',
			icon: '📺',
			description: 'Video platform',
			category: 'Entertainment'
		},
		{
			id: 4,
			title: 'Netflix',
			url: 'https://netflix.com',
			icon: '🎬',
			description: 'Streaming service',
			category: 'Entertainment'
		},
		{
			id: 5,
			title: 'Gmail',
			url: 'https://gmail.com',
			icon: '📧',
			description: 'Email service',
			category: 'Productivity'
		},
		{
			id: 6,
			title: 'Notion',
			url: 'https://notion.so',
			icon: '📝',
			description: 'Notes & docs',
			category: 'Productivity'
		}
	];

	// Sample uptime status data
	const uptimeStatus: UptimeStatus = {
		totalSites: 12,
		upSites: 11,
		downSites: 1,
		lastChecked: '2 min ago'
	};

	// Search engine configuration
	const searchEngines: SearchEngine[] = [
		{
			id: 'google',
			name: 'Google',
			url: 'https://www.google.com/search',
			icon: 'google',
			color: 'from-blue-500 to-blue-600'
		},
		{
			id: 'bing',
			name: 'Bing',
			url: 'https://www.bing.com/search',
			icon: 'bing',
			color: 'from-green-500 to-green-600'
		},
		{
			id: 'duckduckgo',
			name: 'DuckDuckGo',
			url: 'https://duckduckgo.com/',
			icon: 'duckduckgo',
			color: 'from-yellow-500 to-yellow-600'
		}
	];

	let currentTime = new Date();
	let greeting = '';
	let selectedEngine = 'google';

	// Update time every second
	setInterval(() => {
		currentTime = new Date();
	}, 1000);

	// Generate greeting based on time
	$: {
		const hour = currentTime.getHours();
		if (hour < 12) {
			greeting = 'Good Morning';
		} else if (hour < 18) {
			greeting = 'Good Afternoon';
		} else {
			greeting = 'Good Evening';
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
	<!-- Top spacing -->
	<div class="h-8"></div>

	<div class="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
		<!-- Welcome Section -->
		<div class="mb-8 text-center">
			<h1
				class="mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
			>
				{greeting}!
			</h1>
			<div
				class="mx-auto mb-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
			></div>
			<div class="flex items-center justify-center space-x-8">
				<!-- Uptime Status -->
				<div class="rounded-xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur-lg">
					<div class="flex items-center space-x-3">
						<div class="flex items-center space-x-2">
							<div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
							<div class="text-sm font-medium text-gray-900">{uptimeStatus.upSites}</div>
						</div>
						<div class="h-4 w-px bg-gray-300"></div>
						<div class="flex items-center space-x-2">
							<div class="h-2 w-2 rounded-full bg-red-500"></div>
							<div class="text-sm font-medium text-gray-900">{uptimeStatus.downSites}</div>
						</div>
						<div class="text-xs text-gray-500">
							{uptimeStatus.lastChecked}
						</div>
					</div>
				</div>

				<div class="space-y-1">
					<div class="text-xl font-light text-gray-700">
						{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
					</div>
					<div class="text-sm text-gray-500">
						{currentTime.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							weekday: 'long'
						})}
					</div>
				</div>

				<!-- Compact Weather -->
				<div class="rounded-xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur-lg">
					<div class="flex items-center space-x-3">
						<div class="text-2xl">{weatherData.icon}</div>
						<div>
							<div class="text-lg font-bold text-gray-900">{weatherData.temperature}°</div>
							<div class="text-xs text-gray-600">{weatherData.location}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Search Component -->
		<SearchBar {searchEngines} bind:selectedEngine />

		<!-- Bookmarks Section -->
		<div class="mb-8">
			<BookmarkCard {bookmarks} />
		</div>

		<!-- Dashboard Cards -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<EventCard events={upcomingEvents} />
			<EmailCard {emails} />
			<GitHubCard {githubData} />
		</div>
	</div>
</div>

<style>
	.shadow-2xl {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}
</style>
