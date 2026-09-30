import type { RampingVUsScenario } from 'k6/options';

export type AverageLoadScenario<T extends string> = {
    [K in T]: RampingVUsScenario;
};