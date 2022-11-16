const inputEl = document.querySelector('.form');

inputEl.addEventListener('submit', startCreatePromise);

function startCreatePromise(event) {
  event.preventDefault();
  for (let i = 0; i < event.target.amount.value; i+=1) {
    let delay = Number(event.target.delay.value) + Number(event.target.step.value) * i;
    let position = i + 1;
    createPromise(position, delay);
  }
}

function onS({position, delay}) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onE({position, delay}) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay})
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay)
  })
  promise.then(onS).catch(onE);
}
