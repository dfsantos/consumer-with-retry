package dfsantos.consumerwithretry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    private static final Logger log = LoggerFactory.getLogger(Consumer.class);

    @RetryableTopic(replicationFactor = "1")
    @KafkaListener(groupId = "consumer", topics = "meu-topico")
    public void consume(@Payload final String evento) throws Exception {
        log.info("consumindo evento {}", evento);
        throw new Exception();
    }

}
