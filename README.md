## Rodar mongo para projeto
```bash
docker run -d --name test-socket -p 27017:27017 mongo
```

## Rodar projeto em modo dev com serverless offline
```bash
yarn start
```


```json
# chat 1
{"action":"$joinroom","roomKey":"developers", "nickName": "Cabral"}

# chat 2
{"action":"$joinroom","roomKey":"developers", "nickName": "Irineu"}
{"action":"$sendmessage","roomKey":"developers", "content": "oieeee"}
```