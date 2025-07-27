<script lang="ts">
	import { IconMail } from '@tabler/icons-svelte';
	import type { Email } from '../types.js';

	export let emails: Email[] = [];

	$: unreadCount = emails.filter((e) => e.unread).length;
</script>

<div
	class="rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<div class="rounded-xl bg-gradient-to-br from-green-100 to-green-200 p-2">
				<IconMail class="h-5 w-5 text-green-600" />
			</div>
			<div>
				<h2 class="text-lg font-bold text-gray-900">Recent Emails</h2>
				<p class="text-xs text-gray-500">{unreadCount} unread messages</p>
			</div>
		</div>
		<button class="text-xs font-medium text-green-600 hover:text-green-700 hover:underline"
			>View All</button
		>
	</div>
	<div class="space-y-3">
		{#each emails as email}
			<div
				class="-mx-3 rounded-xl border-b border-gray-100/50 p-3 pb-3 transition-all duration-300 last:border-b-0 hover:bg-green-50/30"
			>
				<div class="flex items-start space-x-3">
					<div class="relative flex-shrink-0">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-500"
						>
							<span class="text-xs font-bold text-white">{email.sender.charAt(0)}</span>
						</div>
						{#if email.unread}
							<div
								class="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-white bg-green-500"
							></div>
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						<div class="mb-1 flex items-center justify-between">
							<p
								class="truncate text-sm font-semibold text-gray-900 {email.unread
									? 'text-green-900'
									: ''}"
							>
								{email.sender}
							</p>
							<span
								class="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs whitespace-nowrap text-gray-400"
								>{email.time}</span
							>
						</div>
						<p
							class="mb-1 truncate text-xs font-medium text-gray-900 {email.unread
								? 'text-green-800'
								: ''}"
						>
							{email.subject}
						</p>
						<p class="line-clamp-2 text-xs text-gray-600">{email.preview}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
