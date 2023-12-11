import { sleep } from 'k6';

import {
  Writer,
  Connection,
  SchemaRegistry,
  CODEC_SNAPPY,
  SCHEMA_TYPE_STRING,
} from "k6/x/kafka"; // import kafka extension

const brokers = ["localhost:9092"];
const topic = "meu-topico";

const writer = new Writer({
  brokers: brokers,
  topic: topic,
  autoCreateTopic: false,
  compression: CODEC_SNAPPY,
});

const connection = new Connection({
  address: brokers[0],
});

const schemaRegistry = new SchemaRegistry();

export const options = {
  thresholds: {
    // Base thresholds to see if the writer or reader is working
    kafka_writer_error_count: ["count == 0"],
    kafka_reader_error_count: ["count == 0"],
  },
};

export default function () {
  for (let index = 0; index < 1; index++) {
    let messages = [{
      key: schemaRegistry.serialize({
        data: "2",
        schemaType: SCHEMA_TYPE_STRING,
      }),
      value: schemaRegistry.serialize({
        data: JSON.stringify({
          "identificadorConta": "X",
        }),
        schemaType: SCHEMA_TYPE_STRING,
      })
    }];

    writer.produce({ messages: messages });
    sleep(3);
  }
}

export function teardown(data) {
  writer.close();
  connection.close();
}