<script lang="ts">
	import { signUp } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let loading = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		fieldErrors = {};
		loading = true;

		// Client-side validation
		if (name.length < 3) {
			fieldErrors.name = 'Name must be at least 3 characters';
			loading = false;
			return;
		}

		if (password.length < 8) {
			fieldErrors.password = 'Password must be at least 8 characters';
			loading = false;
			return;
		}

		if (password !== confirmPassword) {
			fieldErrors.confirmPassword = "Passwords don't match";
			loading = false;
			return;
		}

		if (!/[A-Z]/.test(password)) {
			fieldErrors.password = 'Password must contain at least one uppercase letter';
			loading = false;
			return;
		}

		if (!/[a-z]/.test(password)) {
			fieldErrors.password = 'Password must contain at least one lowercase letter';
			loading = false;
			return;
		}

		if (!/[0-9]/.test(password)) {
			fieldErrors.password = 'Password must contain at least one number';
			loading = false;
			return;
		}

		try {
			const result = await signUp.email({
				email,
				password,
				name
			});

			if (result.error) {
				error = result.error.message || 'Failed to create account';
			} else {
				await goto('/splits');
			}
		} catch {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<Card class="w-full max-w-md">
	<CardHeader class="space-y-1">
		<CardTitle class="text-2xl font-bold">Create an account</CardTitle>
		<CardDescription>Start tracking your workouts today</CardDescription>
	</CardHeader>
	<CardContent>
		<form onsubmit={handleSubmit} class="space-y-4">
			{#if error}
				<div class="rounded-lg bg-destructive/10 p-3 text-sm text-destructive" role="alert">
					{error}
				</div>
			{/if}

			<div class="space-y-2">
				<Label for="name">Name</Label>
				<Input
					id="name"
					name="name"
					type="text"
					bind:value={name}
					required
					placeholder="John Doe"
					autocomplete="name"
				/>
				{#if fieldErrors.name}
					<p class="text-sm text-destructive">{fieldErrors.name}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					bind:value={email}
					required
					placeholder="you@example.com"
					autocomplete="email"
				/>
				{#if fieldErrors.email}
					<p class="text-sm text-destructive">{fieldErrors.email}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Label for="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					bind:value={password}
					required
					placeholder="••••••••"
					autocomplete="new-password"
				/>
				{#if fieldErrors.password}
					<p class="text-sm text-destructive">{fieldErrors.password}</p>
				{/if}
				<p class="text-xs text-muted-foreground">
					Must be at least 8 characters with uppercase, lowercase, and number
				</p>
			</div>

			<div class="space-y-2">
				<Label for="confirm-password">Confirm Password</Label>
				<Input
					id="confirm-password"
					name="confirm-password"
					type="password"
					bind:value={confirmPassword}
					required
					placeholder="••••••••"
					autocomplete="new-password"
				/>
				{#if fieldErrors.confirmPassword}
					<p class="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
				{/if}
			</div>

			<Button type="submit" disabled={loading} class="w-full">
				{loading ? 'Creating account...' : 'Create account'}
			</Button>

			<p class="text-center text-sm text-muted-foreground">
				Already have an account?
				<a href="/login" class="font-medium text-primary hover:underline">Sign in</a>
			</p>
		</form>
	</CardContent>
</Card>
