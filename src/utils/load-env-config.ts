export function loadEnvConfig(env: string): void {
    const configPath = `./${env}.json`;
    const config = JSON.parse(open(configPath));
    for (const [key, value] of Object.entries(config)) {
        if (typeof value === 'object' && value !== null) {
            __ENV[key] = JSON.stringify(value);
        } else {
            __ENV[key] = String(value); 
        }
    }
}
