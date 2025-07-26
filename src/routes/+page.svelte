<script lang="ts">
	import { IconSearch, IconBrandGoogle, IconBrandBing } from '@tabler/icons-svelte';

	// 模拟未来事件数据
	const upcomingEvents = [
		{
			id: 1,
			title: "技术分享会",
			date: "2024-01-15",
			time: "14:00",
			location: "会议室A",
			description: "分享最新的技术趋势和开发经验",
			category: "技术"
		},
		{
			id: 2,
			title: "团队建设活动",
			date: "2024-01-20",
			time: "18:00",
			location: "公司大厅",
			description: "增进团队凝聚力的户外活动",
			category: "团队"
		},
		{
			id: 3,
			title: "产品发布会",
			date: "2024-01-25",
			time: "10:00",
			location: "大会议室",
			description: "新产品发布和演示",
			category: "产品"
		}
	];

	// 模拟邮件数据
	const emails = [
		{
			id: 1,
			sender: "John Doe",
			subject: "项目进度更新",
			preview: "关于本周项目进度的详细报告...",
			time: "2小时前",
			unread: true
		},
		{
			id: 2,
			sender: "Jane Smith",
			subject: "会议安排确认",
			preview: "明天的会议时间已经确认，请查收...",
			time: "4小时前",
			unread: true
		},
		{
			id: 3,
			sender: "Tech Team",
			subject: "系统维护通知",
			preview: "系统将在今晚进行维护，预计停机2小时...",
			time: "1天前",
			unread: false
		},
		{
			id: 4,
			sender: "HR Department",
			subject: "员工福利更新",
			preview: "新的员工福利政策已经发布...",
			time: "2天前",
			unread: false
		}
	];

	// 模拟GitHub数据
	const githubData = {
		repositories: [
			{
				name: "navi-app",
				description: "智能导航应用",
				language: "TypeScript",
				stars: 45,
				forks: 12,
				lastUpdate: "2天前"
			},
			{
				name: "dashboard-ui",
				description: "现代化仪表板界面",
				language: "Svelte",
				stars: 23,
				forks: 8,
				lastUpdate: "1周前"
			},
			{
				name: "api-gateway",
				description: "微服务API网关",
				language: "Go",
				stars: 67,
				forks: 15,
				lastUpdate: "3天前"
			}
		],
		recentActivity: [
			{
				type: "push",
				repo: "navi-app",
				branch: "main",
				message: "feat: 添加用户认证功能",
				time: "1小时前"
			},
			{
				type: "pull_request",
				repo: "dashboard-ui",
				branch: "feature/new-layout",
				message: "更新页面布局设计",
				time: "3小时前"
			},
			{
				type: "issue",
				repo: "api-gateway",
				message: "修复API响应时间问题",
				time: "1天前"
			}
		]
	};

	let searchQuery = "";
	let currentTime = new Date();
	let greeting = "";
	let selectedEngine = "google";
	let showEngineDropdown = false;

	// 搜索引擎配置
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

	// 获取当前选中的搜索引擎
	$: currentEngine = searchEngines.find(engine => engine.id === selectedEngine);

	// 根据时间生成问候语
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

	// 格式化日期
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-HK', { month: 'short', day: 'numeric' });
	}

	// 获取活动类型图标
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

	// 执行搜索
	function performSearch() {
		if (searchQuery.trim() && currentEngine) {
			const searchUrl = currentEngine.url + (currentEngine.id === 'duckduckgo' ? '?q=' : '?q=') + encodeURIComponent(searchQuery);
			window.open(searchUrl, '_blank');
		}
	}

	// 处理回车键搜索
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performSearch();
		}
	}

	// 点击外部关闭下拉菜单
	function handleClickOutside(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.search-engine-dropdown')) {
			showEngineDropdown = false;
		}
	}
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- 欢迎区域 -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">{greeting}！</h1>
			</div>
			<div class="text-right">
				<div class="text-2xl font-semibold text-gray-900">
					{currentTime.toLocaleTimeString('en-HK', { hour: '2-digit', minute: '2-digit' })}
				</div>
				<div class="text-sm text-gray-500">
					{currentTime.toLocaleDateString('en-HK', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
				</div>
			</div>
		</div>
	</div>

	<!-- 搜索区域 -->
	<div class="mb-8" role="button" tabindex="0" on:click={handleClickOutside} on:keydown={handleClickOutside}>
		<div class="relative max-w-2xl mx-auto">
			<div class="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
				<!-- 搜索引擎选择器 -->
				<div class="relative search-engine-dropdown">
					<button
						on:click={() => showEngineDropdown = !showEngineDropdown}
						class="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors border-r border-gray-200"
					>
						{#if currentEngine?.icon === 'google'}
							<IconBrandGoogle class="w-5 h-5" />
						{:else if currentEngine?.icon === 'bing'}
							<IconBrandBing class="w-5 h-5" />
						{:else}
							<IconSearch class="w-5 h-5" />
						{/if}
						<span>{currentEngine?.name}</span>
						<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</button>
					
					{#if showEngineDropdown}
						<div class="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
							{#each searchEngines as engine}
								<button
									on:click={() => {
										selectedEngine = engine.id;
										showEngineDropdown = false;
									}}
									class="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors {selectedEngine === engine.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}"
								>
									{#if engine.icon === 'google'}
										<IconBrandGoogle class="w-5 h-5" />
									{:else if engine.icon === 'bing'}
										<IconBrandBing class="w-5 h-5" />
									{:else}
										<IconSearch class="w-5 h-5" />
									{/if}
									<span>{engine.name}</span>
									{#if selectedEngine === engine.id}
										<svg class="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 24 24">
											<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
										</svg>
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- 搜索输入框 -->
				<div class="flex-1 relative">
					<input
						bind:value={searchQuery}
						on:keypress={handleKeyPress}
						type="text"
						placeholder="搜索任何内容..."
						class="w-full px-4 py-3 border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
					/>
				</div>

				<!-- 搜索按钮 -->
				<button
					on:click={performSearch}
					class="px-4 py-3 text-gray-400 hover:text-gray-600 transition-colors"
				>
					<IconSearch class="w-5 h-5" />
				</button>
			</div>
		</div>
	</div>

	<!-- 三列布局 -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- 第一列：即将到来的事件 -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-xl font-semibold text-gray-900">Upcoming Events</h2>
				<button class="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
			</div>
			<div class="space-y-4">
				{#each upcomingEvents as event}
					<div class="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 rounded-r-lg transition-colors">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<h3 class="font-semibold text-gray-900 text-sm mb-1">{event.title}</h3>
								<p class="text-xs text-gray-500 mb-2">{event.description}</p>
								<div class="flex items-center space-x-4 text-xs text-gray-400">
									<span class="flex items-center">
										<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
										</svg>
										{formatDate(event.date)}
									</span>
									<span class="flex items-center">
										<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										{event.time}
									</span>
								</div>
							</div>
							<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								{event.category}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- 第二列：邮件 -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-xl font-semibold text-gray-900">Emails</h2>
				<button class="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
			</div>
			<div class="space-y-4">
				{#each emails as email}
					<div class="border-b border-gray-100 pb-4 last:border-b-0 hover:bg-gray-50 rounded-lg p-2 transition-colors">
						<div class="flex items-start space-x-3">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
									<span class="text-sm font-medium text-gray-700">{email.sender.charAt(0)}</span>
								</div>
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between">
									<p class="text-sm font-medium text-gray-900 truncate">{email.sender}</p>
									<span class="text-xs text-gray-400">{email.time}</span>
								</div>
								<p class="text-sm font-medium text-gray-900 truncate">{email.subject}</p>
								<p class="text-xs text-gray-500 truncate">{email.preview}</p>
								{#if email.unread}
									<div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- 第三列：GitHub -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-xl font-semibold text-gray-900">GitHub</h2>
				<button class="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
			</div>
			
			<!-- 仓库列表 -->
			<div class="mb-6">
				<h3 class="text-sm font-medium text-gray-700 mb-3">Repositories</h3>
				<div class="space-y-3">
					{#each githubData.repositories as repo}
						<div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-sm font-medium text-blue-600">{repo.name}</h4>
								<div class="flex items-center space-x-2 text-xs text-gray-500">
									<span class="flex items-center">
										<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
										</svg>
										{repo.stars}
									</span>
									<span class="flex items-center">
										<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
										</svg>
										{repo.forks}
									</span>
								</div>
							</div>
							<p class="text-xs text-gray-600 mb-2">{repo.description}</p>
							<div class="flex items-center justify-between">
								<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
									{repo.language}
								</span>
								<span class="text-xs text-gray-400">{repo.lastUpdate}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- 最近活动 -->
			<div>
				<h3 class="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
				<div class="space-y-3">
					{#each githubData.recentActivity as activity}
						<div class="flex items-start space-x-2">
							<span class="text-sm">{getActivityIcon(activity.type)}</span>
							<div class="flex-1 min-w-0">
								<p class="text-xs text-gray-900 truncate">{activity.message}</p>
								<div class="flex items-center space-x-2 text-xs text-gray-500">
									<span>{activity.repo}</span>
									{#if activity.branch}
										<span>• {activity.branch}</span>
									{/if}
									<span>• {activity.time}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>