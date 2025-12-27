import { PlayFunction } from '@storybook/vue3-vite';
import { expect, waitFor } from 'storybook/test';

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

export async function waitForVuetifyDialogReady() {
  await waitFor(() => {
    const overlay = document.querySelector('.v-overlay--active');
    expect(overlay).toBeTruthy();
  });
}


export async function waitForVuetifyInputReady(el: HTMLElement) {
  await waitFor(() => {
    const style = window.getComputedStyle(el);
    expect(style.pointerEvents).not.toBe('none');
    expect(el).not.toHaveAttribute('disabled');
  });
}

export async function getVuetifyInput(labelEl: HTMLElement) {
  const input = labelEl.closest('.v-input')?.querySelector('input');
  if (!input) throw new Error(`Input not found for label ${labelEl.textContent}`);
  return input;
}


