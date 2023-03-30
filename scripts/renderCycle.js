export function renderCycle(cb) {
    const tick = function () {
      requestAnimationFrame(function () {
        cb();
        tick();
      });
    };
  
    tick();
  }