<script>
    import { enhance } from '$app/forms';
    export let form;
    let loading = false;
</script>

<div class="max-w-md mx-auto flex flex-col gap-12 text-white">
    <div>
        <h2 class="text-3xl font-light tracking-tight mb-8">Login</h2>
        <form method="POST" action="?/login" class="flex flex-col gap-4" use:enhance={() => {
            loading = true;
            return async ({ update }) => {
                loading = false;
                await update();
            };
        }}>
            <div class="flex flex-col gap-2">
                <label for="login-username" class="text-sm font-medium text-gray-400">Användarnamn</label>
                <input id="login-username" type="text" name="username" required class="px-4 py-3 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition-colors" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="login-password" class="text-sm font-medium text-gray-400">Lösenord</label>
                <input id="login-password" type="password" name="password" required class="px-4 py-3 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition-colors" />
            </div>
            <button type="submit" disabled={loading} class="mt-4 px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                {loading ? "Loggar in..." : "Logga in"}
            </button>
        </form>
    </div>

    <div>
        <h2 class="text-2xl font-light tracking-tight mb-8 border-t border-gray-800 pt-8">Skapa konto (Ny Användare)</h2>
        <form method="POST" action="?/register" class="flex flex-col gap-4" use:enhance>
            <div class="flex flex-col gap-2">
                <label for="reg-username" class="text-sm font-medium text-gray-400">Välj Användarnamn</label>
                <input id="reg-username" type="text" name="username" required class="px-4 py-3 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition-colors" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="reg-password" class="text-sm font-medium text-gray-400">Välj Lösenord</label>
                <input id="reg-password" type="password" name="password" required class="px-4 py-3 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition-colors" />
            </div>
            <button type="submit" class="mt-4 px-6 py-3 bg-gray-900 border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors">
                Registrera mig
            </button>
        </form>
    </div>

    {#if form?.error}
        <div class="p-4 bg-red-950/30 border border-red-900 text-red-500 font-medium text-center mt-4">
            {form.error}
        </div>
    {/if}
</div>
