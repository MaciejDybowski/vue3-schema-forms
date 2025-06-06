/***
 Promise for mounted async functions
 ***/
export async function waitForMountedAsync(ms = 10) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
