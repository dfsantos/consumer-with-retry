# Exemplo Spring Kafka com retry

**Subir containeres**

```shell
docker compose up -d
```

**Iniciar aplicação**

```shell
./gradlew bootRun
```

**Publicar mensagens**

```shell
./loadtest/k6 run ./loadtest/smoke.js
```

**Verificar as mensagens**

http://localhost:30080/ui/clusters/LOCAL/all-topics?perPage=25&hideInternal=true