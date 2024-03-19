# GRAFANA and DOCKER
## Docker
- Watch processes
```sh
docker ps -a
```
- Remove container `grafana`
```sh
docker stop grafana
docker rm grafana
```
- Create container `grafana`
```sh
docker run -d --name=grafana -p 3122:3000 grafana/grafana-oss
```
- Start a container `grafana`
```sh
docker start grafana
```
- Execute a container `grafana`
```sh
docker exec -it grafana /bin/bash
```

## Windows
Doing it With Windows installer you have to go here: 
`C:\Program Files\GrafanaLabs\grafana\bin` and run `grafana-server.exe`