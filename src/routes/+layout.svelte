<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>
</div>
