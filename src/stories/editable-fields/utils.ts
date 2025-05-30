/***
 Promise for mounted async functions
 ***/
export async function waitForMountedAsync() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}
