import * as brain from "brain.js";
let netWork = null;

onmessage = async ({ data }) => {
  switch (data.type) {
    case "CLEAR":
      netWork = null;
      break;
    case "RECOGNIZE":
      const result = netWork
        ? brain.likely(data.calculation, netWork)
        : "Необходима тренировка";
      postMessage({ type: data.type, result });
      break;
    case "TRAIN":
      netWork = new brain.NeuralNetwork();
      await netWork.trainAsync(data.train_data, { log: true });
      postMessage({ type: data.type });
      break;
  }
};
