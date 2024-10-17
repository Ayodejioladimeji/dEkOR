export function screenPixels(size, setState) {
  const mediaQuery = window.matchMedia(`(max-width: ${size}`);

  function handleScreenSizeChange(event) {
    setState(event.matches);
  }

  mediaQuery.addEventListener("change", handleScreenSizeChange);

  // Initialize the state
  setState(mediaQuery.matches);

  // Cleanup the event listener when the component unmounts
  return () => {
    mediaQuery.removeEventListener("change", handleScreenSizeChange);
  };
}
