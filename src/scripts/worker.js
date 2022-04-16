import * as brain from "brain.js";

onmessage = ({ data }) => {
  switch (data.type) {
    case "RECOGNIZE":
      const netWork = new brain.NeuralNetwork();
      netWork.train(data.train_data, { log: true });
      const result = brain.likely(data.calculation, netWork);
      postMessage({ type: data.type, result });
      break;
    case "TRAIN":
      console.log(localStorage);
      break;
  }
};
