// @ts-nocheck
import { PlayFunction } from '@storybook/vue3-vite';








/***
 Promise for mounted async functions
 ***/
export async function waitForMountedAsync(ms = 10) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function playWrapper(playFn: PlayFunction): PlayFunction {
  return async (context) => {
    await waitForMountedAsync(); // czekamy przed rozpoczęciem play
    await playFn(context); // wywołujemy oryginalne play
  };
}
